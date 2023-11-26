import Navbar from '@/components/layout/Navbar';

import Map from '@/components/Map/index';
import GoPreviousLevelButton from '@/components/GoPreviousLevelButton';
import Breadcrumb from '@/components/UI/Breadcrumb';
import CandVoteShare from '@/components/CandVoteShare';
import VotingRate from '@/components/VotingRate';
import AreaVotingTable from '@/components/AreaVotingTable';
import StatisticsLayout from '@/components/layout/StatisticsLayout';
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

  const { year, city, dist = '' } = searchParams;

  // TODO sleep & error handling
  const { candidates, votingResult, subareas } = await fetchElectionData(
    year,
    city,
    dist,
  );

  return (
    <div>
      <Navbar />
      <main className='2xl:flex mt-[65px]'>
        {/* map */}
        <article className='w-full 2xl:w-[500px] h-[150px] 2xl:h-[calc(100vh-65px)] bg-gray-400 overflow-auto shrink-0'>
          <Map />
        </article>

        {/* statistics */}
        <StatisticsLayout>
          {/* info */}
          <section>
            <div className='flex items-center gap-2.5 mb-[6px]'>
              <GoPreviousLevelButton city={city} dist={dist} />
              <h3 className='heading-3'>{title}</h3>
            </div>
            <Breadcrumb routers={routers} />
          </section>

          {/* overview */}
          <section className='flex flex-col gap-4 bg-background rounded-xl px-4 py-6'>
            <h4 className='heading-5'>總統得票數</h4>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
              <CandVoteShare
                candidates={candidates}
                votingResult={votingResult}
              />
              <VotingRate votingResult={votingResult} />
            </div>
          </section>

          {/* party result */}
          <section className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
              votingResultArr={subareas}
            />
          </section>
        </StatisticsLayout>
      </main>
    </div>
  );
}

export default ElectionDataPage;
