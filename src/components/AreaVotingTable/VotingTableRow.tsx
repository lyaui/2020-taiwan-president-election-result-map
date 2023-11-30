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
      <span className='text-text-secondary xs:hidden'>當選人</span>
      <div
        className={`relative h-[32px] w-[32px] ${winner.party_id} overflow-hidden rounded-full`}
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
      <td className='heading-6 w-[80px] px-2 py-3 xs:w-[100px] xs:py-2.5 xl:w-[180px]'>
        {name}
      </td>
      <td className='w-[180px] px-2 py-3 xs:py-2.5 lg:w-[330px]'>
        <div className='xs:hidden'>{displayWinner}</div>
        <PercentageBar height={8} groups={barGroups} />
      </td>
      <td className='hidden px-2 py-3 xs:table-cell xs:py-2.5'>
        {displayWinner}
      </td>
      <td className='hidden px-2 py-3 xs:py-2.5 sm:table-cell'>
        {numberWithCommas(votes.total_votes)}
      </td>
      <td className='hidden px-2 py-3 xs:py-2.5 sm:table-cell'>
        {(+voter_turnout).toFixed(2) + '%'}
      </td>
      <td className='w-[20px] xs:w-8 xs:py-2.5'>
        {level !== levels.village && (
          <ChevronRightIcon className='ml-2 w-[14px] xs:mr-5' />
        )}
      </td>
    </VotingTableRowWrapper>
  );
}

export default VotingTableRow;
