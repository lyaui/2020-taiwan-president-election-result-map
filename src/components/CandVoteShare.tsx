import Image from 'next/image';

import { numberWithCommas } from '@/utils/index';
import PercentageBar from '@/components/UI/PercentageBar';

const DUMMY_CANDIDATES = [
  {
    cand_id: '201201',
    cand_name: '綠巨魔',
    cand_img: 'troll',
    party_id: 'party-3',
    party_name: '木棍黨',
  },
  {
    cand_id: '201202',
    cand_name: '科學怪人',
    cand_img: 'zombie',
    party_id: 'party-1',
    party_name: '蝙蝠黨',
  },
  {
    cand_id: '201203',
    cand_name: '林克',
    cand_img: 'elf',
    party_id: 'party-2',
    party_name: '弓箭黨',
  },
];

interface Candidate {
  cand_id: string;
  cand_name: string;
  cand_img: string;
  party_id: string;
  party_name: string;
}

function CandidateInfo({
  cand_id,
  cand_name,
  cand_img,
  party_id,
  party_name,
}: Candidate) {
  return (
    <div key={cand_id} className='flex gap-3'>
      <div
        className={`relative w-[48px] h-[48px] ${party_id} rounded-2xl overflow-hidden`}
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
        <p className='text-text-secondary caption'>{party_name}</p>
        <p>{cand_name}</p>
        <p>
          <span className='heading-6 mr-0.5'>{numberWithCommas(666666)}</span>票
        </p>
      </div>
    </div>
  );
}

function CandVoteShare() {
  return (
    <div className='flex flex-col gap-3 bg-white px-6 py-[30px] rounded-xl'>
      <div className='grid grid-cols-3 gap-10'>
        {DUMMY_CANDIDATES.map((_cand: Candidate) => (
          <CandidateInfo key={_cand.cand_id} {..._cand} />
        ))}
      </div>
      <PercentageBar
        height={18}
        showValue={true}
        groups={[
          {
            color: 'party-1',
            value: 100,
          },
          {
            color: 'party-2',
            value: 200,
          },
          {
            color: 'party-3',
            value: 300,
          },
        ]}
      />
    </div>
  );
}

export default CandVoteShare;
