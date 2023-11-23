import Navbar from '@/components/layout/Navbar';
import Map from '@/components/Map/index';
import Breadcrumb from '@/components/UI/Breadcrumb';
import { getTitle, getBreadcrumbRouters } from '@/pageFunctions/election-data';

export interface SearchParams {
  [key: string]: string | undefined;
  year?: string;
  city?: string;
  dist?: string;
}
interface ElectionDataPageProps {
  searchParams: SearchParams;
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
