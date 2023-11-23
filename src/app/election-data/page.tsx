import querystring from 'query-string';

import Navbar from '@/components/layout/Navbar';
import Map from '@/components/Map/index';
import { ROUTER, QUERY } from '@/routers/index';
import Breadcrumb, { type BreadCrumbProps } from '@/components/UI/Breadcrumb';

interface SearchParams {
  [key: string]: string | undefined;
  year?: string;
  city?: string;
  dist?: string;
}
interface ElectionDataPageProps {
  searchParams: SearchParams;
}

type RoutersType = BreadCrumbProps['routers'];

function getTitle(searchParams: SearchParams) {
  const { [QUERY.CITY]: city = '', [QUERY.DIST]: dist = '' } = searchParams;
  if (dist) return dist;
  if (city) return city;
  return '全臺縣市總統得票';
}

function getBreadcrumbRouters(searchParams: SearchParams): RoutersType {
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
      ROUTER.ELECTION_DATA + '?' + querystring.stringify(_route.query, { skipEmptyString: true }),
  }));
}

function ElectionDataPage({ searchParams }: ElectionDataPageProps) {
  const title = getTitle(searchParams);
  const routers = getBreadcrumbRouters(searchParams);

  return (
    <div>
      <Navbar />
      <main className='flex mt-[65px]'>
        <Map />
        <article className='h-[calc(100vh-65px)] flex flex-col gap-6 px-12 py-8 overflow-auto '>
          {/* info */}
          <div>
            <h3 className='heading-3 mb-[6px]'>{title}</h3>
            <Breadcrumb routers={routers} />
          </div>

          {/* overview */}
          {/* party result */}
          {/* area result */}
        </article>
      </main>
    </div>
  );
}

export default ElectionDataPage;
