import Image from 'next/image';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { numberWithCommas } from '@/utils/index';
import { getOrderedVoteResult } from '@/pageFunctions/election-data';
import { type Candidate, type VotingResult } from '@/types/index';
import PercentageBar from '@/components/UI/PercentageBar';

interface CandidateInfoProps extends Candidate {
  vote_cnt: number;
  winner: boolean;
}

function CandidateInfo({
  cand_id,
  cand_name,
  cand_img,
  party_id,
  party_name,
  vote_cnt,
  winner,
}: CandidateInfoProps) {
  return (
    <div key={cand_id} className='flex gap-3'>
      <div
        className={`relative h-[48px] w-[48px] ${party_id} overflow-hidden rounded-2xl`}
      >
        <Image
          src={`/assets/images/candidate_${cand_img}.png`}
          alt={cand_name}
          fill
          style={{ objectFit: 'cover', transform: 'scale(1.2)', top: 8 }}
          draggable={false}
        />
      </div>
      <div className='flex flex-col gap-[2px]'>
        <p className='caption !text-text-secondary'>{party_name}</p>
        <p className='flex gap-1'>
          {cand_name}
          {winner && <CheckCircleIcon className='w-[20px] text-primary' />}
        </p>
        <p>
          <span className='heading-6 mr-0.5'>{numberWithCommas(vote_cnt)}</span>
          票
        </p>
      </div>
    </div>
  );
}

function CandVoteShare({
  candidates = [],
  votingResult,
}: {
  candidates: Candidate[];
  votingResult: VotingResult;
}) {
  const { orderedCandiData, barGroups } = getOrderedVoteResult({
    candidates,
    votingResult,
  });

  return (
    <div className='flex flex-col gap-3 rounded-xl bg-white p-4 xs:px-6 xs:py-[30px]'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-10'>
        {orderedCandiData.map(
          (_cand: Candidate & { vote_cnt: number }, _index) => (
            <CandidateInfo
              key={_cand.cand_id}
              {..._cand}
              winner={_index === 0}
            />
          )
        )}
      </div>
      <PercentageBar height={18} showValue={true} groups={barGroups} />
    </div>
  );
}

export default CandVoteShare;
