import { promises as fs } from 'fs';
import querystring from 'query-string';

import { type SearchParams } from '@/types/index';
import { type BreadCrumbProps } from '@/components/UI/Breadcrumb';
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
  year: string = `${years[0]}`,
  city: string = '',
  dist: string = '',
) {
  // TODO: error handling
  const votingFile = await fs.readFile(
    process.cwd() + `/public/json/${year}/${city}.json`,
    'utf8',
  );

  const candiFile = await fs.readFile(
    process.cwd() + `/public/json/candidates.json`,
    'utf8',
  );

  const statistics = JSON.parse(votingFile);
  const candidates = JSON.parse(candiFile)[year];

  return {
    statistics,
    candidates,
  };
}
