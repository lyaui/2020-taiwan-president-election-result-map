import Navbar from '@/components/layout/Navbar';
import Map from '@/components/Map/index';
import { QUERY } from '@/routers/index';

interface ElectionDataPageProps {
  searchParams: {
    [key: string]: string | undefined;
    year?: string;
    city?: string;
    dist?: string;
  };
}

function ElectionDataPage({ searchParams }: ElectionDataPageProps) {
  const { [QUERY.CITY]: city = '', [QUERY.DIST]: dist = '' } = searchParams;

  const title = (() => {
    if (dist) return dist;
    if (city) return city;
    return '全臺縣市總統得票';
  })();

  return (
    <div>
      <Navbar />
      <main className='flex mt-[65px]'>
        <Map />
        <article className='h-[calc(100vh-65px)] px-12 py-8 overflow-auto '>
          {/* info */}
          <h3 className='heading-3'>{title}</h3>

          {/* overview */}
          {/* party result */}
          {/* area result */}
        </article>
      </main>
    </div>
  );
}

export default ElectionDataPage;
