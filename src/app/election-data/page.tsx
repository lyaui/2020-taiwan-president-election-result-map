import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Map from '@/components/Map/index';
import Breadcrumb from '@/components/UI/Breadcrumb';
import CandVoteShare from '@/components/CandVoteShare';
import VotingRate from '@/components/VotingRate';
import AreaVotingTable from '@/components/AreaVotingTable/index';
import {
  getTitle,
  getBreadcrumbRouters,
  fetchElectionData,
} from '@/pageFunctions/election-data';
import { type SearchParams } from '@/types/index';

interface ElectionDataPageProps {
  searchParams: SearchParams;
}

async function ElectionDataPage({ searchParams }: ElectionDataPageProps) {
  const title = getTitle(searchParams);
  const routers = getBreadcrumbRouters(searchParams);

  const { year, city } = searchParams;

  // TODO sleep & error handling
  const { statistics, candidates } = await fetchElectionData(year, city);

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
              <CandVoteShare
                candidates={candidates}
                statistics={statistics.city}
              />
              <VotingRate statistics={statistics.city} />
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
          <section className='flex flex-col gap-2 py-4'>
            <h4 className='heading-5'>各區域投票總覽</h4>
            <AreaVotingTable
              candidates={candidates}
              statisticsArr={statistics.dist}
            />
          </section>
          <Footer />
        </article>
      </main>
    </div>
  );
}

export default ElectionDataPage;
