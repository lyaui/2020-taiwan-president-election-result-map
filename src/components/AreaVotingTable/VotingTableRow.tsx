import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

import { type Candidate, type VotingResult } from '@/types';
import { levels } from '@/constants';
import { getOrderedVoteResult } from '@/pageFunctions/election-data';
import { numberWithCommas } from '@/utils/index';
import VotingTableRowWrapper from '@/components/AreaVotingTable/VotingTableRowWrapper';
import PercentageBar from '@/components/UI/PercentageBar';

function VotingTableRow({
  candidates,
  votingResult,
}: {
  candidates: Candidate[];
  votingResult: VotingResult;
}) {
  const { name, level, votes, voter_turnout } = votingResult;

  const { orderedCandiData, barGroups } = getOrderedVoteResult({
    candidates,
    votingResult,
  });

  const winner = orderedCandiData[0];

  const displayWinner = (
    <div className='flex items-center gap-2'>
      <span className='xs:hidden text-text-secondary'>當選人</span>
      <div
        className={`relative w-[32px] h-[32px] ${winner.party_id} rounded-full overflow-hidden`}
      >
        <Image
          src={`/assets/images/candidate_${winner.cand_img}.png`}
          alt={winner.cand_name}
          fill
          style={{ objectFit: 'cover', transform: 'scale(1.2)', top: 8 }}
          draggable={false}
        />
      </div>
      {winner.cand_name}
    </div>
  );

  return (
    <VotingTableRowWrapper
      placeName={votingResult.name}
      placeLevel={votingResult.level}
    >
      <td className='w-[80px] xs:w-[100px] xl:w-[180px] heading-6 px-2 py-3 xs:py-2.5'>
        {name}
      </td>
      <td className='w-[180px] lg:w-[330px] px-2 py-3 xs:py-2.5'>
        <div className='xs:hidden'>{displayWinner}</div>
        <PercentageBar height={8} groups={barGroups} />
      </td>
      <td className='hidden xs:table-cell px-2 py-3 xs:py-2.5'>
        {displayWinner}
      </td>
      <td className='hidden sm:table-cell px-2 py-3 xs:py-2.5'>
        {numberWithCommas(votes.total_votes)}
      </td>
      <td className='hidden sm:table-cell px-2 py-3 xs:py-2.5'>
        {(+voter_turnout).toFixed(2) + '%'}
      </td>
      <td className='xs:py-2.5 w-[20px] xs:w-8'>
        {level !== levels.village && (
          <ChevronRightIcon className='w-[14px] ml-2 xs:mr-5' />
        )}
      </td>
    </VotingTableRowWrapper>
  );
}

export default VotingTableRow;
