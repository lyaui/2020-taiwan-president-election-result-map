import Image from 'next/image';

import { type Candidate, type VotingResult } from '@/types/index';
import PercentageBar from '@/components/UI/PercentageBar';
import { getOrderedVoteResult } from '@/pageFunctions/election-data';
import VotingTableRowWrapper from '@/components/AreaVotingTable/VotingTableRowWrapper';

function VotingTableRow({
  candidates,
  votingResult,
}: {
  candidates: Candidate[];
  votingResult: VotingResult;
}) {
  const { name, votes, voter_turnout } = votingResult;

  const { orderedCandiData, barGroups } = getOrderedVoteResult({
    candidates,
    votingResult,
  });

  const winner = orderedCandiData[0];

  return (
    <VotingTableRowWrapper placeName={votingResult.name}>
      <td className='heading-6 px-2 py-2.5'>{name}</td>
      <td className='px-2 py-2.5'>
        <PercentageBar height={8} groups={barGroups} />
      </td>
      <td className='flex items-center gap-2 px-2 py-2.5'>
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
      </td>
      <td className='px-2 py-2.5'>{votes.total_votes}</td>
      <td className='px-2 py-2.5'>{(+voter_turnout).toFixed(2) + '%'}</td>
      <td className='px-2 py-2.5 w-10'>{`>`}</td>
    </VotingTableRowWrapper>
  );
}

export default VotingTableRow;
