import path from 'path';
import { promises as fs } from 'fs';
import querystring from 'query-string';

import {
  type SearchParams,
  type Candidate,
  type VotingResult,
} from '@/types/index';
import { type BreadCrumbProps } from '@/components/UI/Breadcrumb';
import { transCommaStringToNumber } from '@/utils/index';
import { years } from '@/constants/index';
import { ROUTER, QUERY } from '@/routers/index';

type RoutersType = BreadCrumbProps['routers'];

export function getTitle(searchParams: SearchParams) {
  const { [QUERY.CITY]: city = '', [QUERY.DIST]: dist = '' } = searchParams;
  if (dist) return dist;
  if (city) return city;
  return '全臺縣市總統得票';
}

export function getBreadcrumbRouters(searchParams: SearchParams): RoutersType {
  const { [QUERY.CITY]: city = '', [QUERY.DIST]: dist = '' } = searchParams;

  const baseRouter = {
    label: '全台縣市總統得票',
    query: { ...searchParams, [QUERY.CITY]: '', [QUERY.DIST]: '' },
  };

  const cityRouter = {
    label: city,
    query: { ...searchParams, [QUERY.DIST]: '' },
  };

  const distRouter = {
    label: dist,
    query: { ...searchParams },
  };

  let routes: { label: string; query: SearchParams }[] = [];

  if (city) {
    routes = [baseRouter, cityRouter];
  }

  if (dist && city) {
    routes = [baseRouter, cityRouter, distRouter];
  }

  return routes.map((_route) => ({
    label: _route.label,
    path:
      ROUTER.ELECTION_DATA +
      '?' +
      querystring.stringify(_route.query, { skipEmptyString: true }),
  }));
}

export async function fetchElectionData(
  year: (typeof years)[number] = years[0],
  city: string = '',
  dist: string = '',
) {
  const workDirPath = process.cwd();
  const folderPath = `public/json`;

  // TODO: error handling
  const votingFile = await fs.readFile(
    path.join(workDirPath, `${folderPath}/${year}`, `${city || '全國'}.json`),
    'utf8',
  );
  const candiFile = await fs.readFile(
    path.join(workDirPath, `${folderPath}/`, 'candidates.json'),
    'utf8',
  );

  // TODO type
  const votingResult = JSON.parse(votingFile);
  const candidates = JSON.parse(candiFile)[year];

  if (dist) {
    return {
      candidates,
      votingResult: votingResult.dist.find(
        (_result: VotingResult) => _result.name === dist,
      ),
      subareas: votingResult.village.filter(
        (_result: VotingResult) => _result.affiliation === dist,
      ),
    };
  }

  if (city) {
    return {
      candidates,
      votingResult: votingResult.city.find(
        (_result: VotingResult) => _result.name === city,
      ),
      subareas: votingResult.dist,
    };
  }

  return {
    candidates,
    votingResult: votingResult.country[0],
    subareas: votingResult.city,
  };
}

export function getOrderedVoteResult({
  candidates,
  votingResult,
}: {
  candidates: Candidate[];
  votingResult: VotingResult;
}) {
  const orderedCandiData: (Candidate & { vote_cnt: number })[] = candidates
    .map((_cand) => {
      return {
        ..._cand,
        vote_cnt: transCommaStringToNumber(
          votingResult?.candidates[_cand.cand_id],
        ),
      };
    })
    .sort((_a, _b) => _b.vote_cnt - _a.vote_cnt);

  const barGroups = orderedCandiData.map((_cand) => ({
    label: _cand.cand_name,
    color: _cand.party_id,
    value: _cand.vote_cnt,
  }));

  return { orderedCandiData, barGroups };
}
