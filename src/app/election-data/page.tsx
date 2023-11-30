import { notFound } from 'next/navigation';

import Map from '@/components/Map/index';
import GoPreviousLevelButton from '@/components/GoPreviousLevelButton';
import Breadcrumb from '@/components/UI/Breadcrumb';
import CandVoteShare from '@/components/CandVoteShare';
import VotingRate from '@/components/VotingRate';
import HistoryPartyVotes from '@/components/Chart/HistoryPartyVotes';
import HistoryPartyRate from '@/components/Chart/HistoryPartyRate';
import AreaVotingTable from '@/components/AreaVotingTable';
import StatisticsLayout from '@/components/layout/StatisticsLayout';
import {
  getTitle,
  getBreadcrumbRouters,
  fetchElectionData,
} from '@/pageFunctions/election-data';
import type {
  SearchParams,
  Candidate,
  VotingResult,
  Subareas,
  PreviousPartyVotes,
} from '@/types/index';

interface ElectionDataPageProps {
  searchParams: SearchParams;
}

interface ResSuccess {
  isSuccess: true;
  candidates: Candidate[];
  votingResult: VotingResult;
  subareas: Subareas;
  historyPartyVotes: PreviousPartyVotes[];
}

interface ResRejected {
  isSuccess: false;
}

async function ElectionDataPage({ searchParams }: ElectionDataPageProps) {
  const title = getTitle(searchParams);
  const routers = getBreadcrumbRouters(searchParams);

  const { year = '2020', city, dist = '' } = searchParams;

  const res = (await fetchElectionData({
    year,
    city,
    dist,
  })) as ResSuccess | ResRejected;

  if (!res.isSuccess) {
    notFound();
  }

  const candidates = res.candidates || {};
  const votingResult = res.votingResult || {};
  const subareas = res.subareas || [];
  const historyPartyVotes = res.historyPartyVotes || [];

  return (
    <main className='mt-[65px] 2xl:flex'>
      {/* map */}
      <article className='h-[150px] w-full shrink-0 overflow-auto bg-gray-400 2xl:h-[calc(100vh-65px)] 2xl:w-[500px]'>
        <Map />
      </article>

      {/* statistics */}
      <StatisticsLayout>
        {/* info */}
        <section>
          <div className='mb-[6px] flex items-center gap-2.5'>
            <GoPreviousLevelButton city={city} dist={dist} />
            <h3 className='heading-3'>{title}</h3>
          </div>
          <Breadcrumb routers={routers} />
        </section>

        {/* overview */}
        <section className='flex flex-col gap-4 rounded-xl bg-background px-4 py-6'>
          <h4 className='heading-5'>總統得票數</h4>
          <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
            <CandVoteShare
              candidates={candidates}
              votingResult={votingResult!}
            />
            <VotingRate votingResult={votingResult!} />
          </div>
        </section>

        {/* party result */}
        <section className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <HistoryPartyVotes historyPartyVotes={historyPartyVotes} />
          <HistoryPartyRate historyPartyVotes={historyPartyVotes} />
        </section>

        {/* area result */}
        <section className='flex flex-col gap-2 py-4'>
          <h4 className='heading-5'>各區域投票總覽</h4>
          <AreaVotingTable candidates={candidates} votingResultArr={subareas} />
        </section>
      </StatisticsLayout>
    </main>
  );
}

export default ElectionDataPage;
