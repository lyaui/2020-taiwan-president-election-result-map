import path from 'path';
import { promises as fs } from 'fs';
import querystring from 'query-string';

import {
  type SearchParams,
  type Candidate,
  type VotingResult,
  type Level,
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

export async function fetchElectionData({
  year = '2020',
  city = '',
  dist = '',
}: {
  year: (typeof years)[number];
  city?: string;
  dist?: string;
}) {
  const workDirPath = process.cwd();
  const folderPath = `public/json`;

  const candiFile = await fs.readFile(
    path.join(workDirPath, `${folderPath}/`, 'candidates.json'),
    'utf8',
  );

  const readFiles = async () => {
    const filePaths = years.map((_year) =>
      path.join(
        workDirPath,
        `${folderPath}/${_year}`,
        `${city || '全國'}.json`,
      ),
    );

    try {
      const fileContents = await Promise.all(
        filePaths.map(async (filePath) => {
          return await fs.readFile(filePath, 'utf8');
        }),
      );

      return { isSuccess: true, data: fileContents };
    } catch (error) {
      if (error instanceof Error) {
        return { isSuccess: false, error: error.message };
      }
    }
  };

  const result = await readFiles();

  if (result && result.isSuccess && result.data) {
    const currentYearIdx = years.indexOf(year);
    const votingFile = result.data[currentYearIdx];

    const transferObjValueToNumber = (obj: VotingResult) => {
      return (Object.entries(obj) as [string, number | string][]).reduce(
        (_acc, [_key, _value]) => {
          _acc[_key] =
            typeof _value === 'number'
              ? _value
              : transCommaStringToNumber(_value);
          return _acc;
        },
        {} as { [key: string]: number },
      );
    };

    const formatResult = (arr: VotingResult[]) => {
      return arr.map((_item) => ({
        name: _item.name,
        level: _item.level,
        affiliation: _item.affiliation,
        candidates: transferObjValueToNumber(_item.candidates),
        votes: transferObjValueToNumber(_item.votes),
        voter_turnout:
          typeof _item.voter_turnout === 'number'
            ? _item.voter_turnout
            : +_item.voter_turnout,
      }));
    };

    const votingResult = Object.entries(JSON.parse(votingFile)).reduce(
      (_acc, [_key, _value]) => {
        _acc[_key] = formatResult(_value as VotingResult[]);
        return _acc;
      },
      {} as { [key: string]: VotingResult[] },
    );

    const candidates = JSON.parse(candiFile)[year];

    let res = { isSuccess: true, candidates };

    const getYearlyPartyVotes = ({
      name,
      level,
    }: {
      name: string;
      level: Level;
    }) => {
      return result.data.map((_result, _index) => {
        // 找出目標地區
        const targetArea: VotingResult = JSON.parse(_result)[level].find(
          (_item: VotingResult) => _item.name === name,
        );

        // 將候選人替換成該政黨
        const yearCandidates = JSON.parse(candiFile)[years[_index]];
        // [{year, partyA, partyB}]
        const partyVotes = Object.entries(targetArea.candidates).reduce(
          (_acc, [_key, _value]) => {
            const party = yearCandidates.find(
              (_cand: Candidate) => _cand.cand_id === _key,
            );
            _acc.push({
              name: party.party_name,
              id: party.party_id,
              value: transCommaStringToNumber(_value),
            });
            return _acc;
          },
          [],
        );

        return {
          year: years[_index],
          party_votes: partyVotes,
        };
      });
    };

    if (dist) {
      return {
        ...res,
        votingResult: votingResult.dist?.find(
          (_result: VotingResult) => _result.name === dist,
        ),
        subareas: votingResult.village?.filter(
          (_result: VotingResult) => _result.affiliation === dist,
        ),

        prePartyVotes: getYearlyPartyVotes({ name: dist, level: 'dist' }),
      };
    }

    if (city) {
      return {
        ...res,
        votingResult: votingResult.city.find(
          (_result: VotingResult) => _result.name === city,
        ),
        subareas: votingResult.dist,
        prePartyVotes: getYearlyPartyVotes({ name: city, level: 'city' }),
      };
    }

    return {
      ...res,
      votingResult: votingResult.country[0],
      subareas: votingResult.city,
      prePartyVotes: getYearlyPartyVotes({ name: '總計', level: 'country' }),
    };
  } else {
    console.error(`Failed to read files: ${result?.error}`);
    // 失敗時的處理
  }
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
        vote_cnt: votingResult?.candidates[_cand.cand_id],
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
