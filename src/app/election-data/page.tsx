import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
        <article className='h-[calc(100vh-65px)] w-full flex flex-col gap-6 px-12 pt-8 overflow-auto '>
          {/* info */}
          <div>
            <h3 className='heading-3 mb-[6px]'>{title}</h3>
            <Breadcrumb routers={routers} />
          </div>

          {/* overview */}
          <section className='flex flex-col gap-4 bg-background rounded-xl p-4'>
            <h4 className='heading-5'>總統得票數</h4>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white px-6 py-[30px] rounded-xl'>
                candidates
              </div>
              <div className='bg-white px-6 py-[30px] rounded-xl'>
                donuts chart
              </div>
            </div>
          </section>

          {/* party result */}
          <section className='grid grid-cols-2 gap-4'>
            <div className='border-[1px] border-line px-4 py-6 rounded-xl'>
              <h4 className='heading-5'>歷屆政黨得票數</h4>
            </div>
            <div className='border-[1px] border-line px-4 py-6 rounded-xl'>
              <h4 className='heading-5'>歷屆政黨得票率</h4>
            </div>
          </section>
          {/* area result */}
          <section className='py-4'>
            <h4 className='heading-5'>各區域投票總覽</h4>
            <div>area data table</div>
          </section>
          <Footer />
        </article>
      </main>
    </div>
  );
}

export default ElectionDataPage;
