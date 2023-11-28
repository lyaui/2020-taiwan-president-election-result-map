import { type VotingResult } from '@/types/index';
import { numberWithCommas } from '@/utils/index';
import DonutChart from '@/components/UI/DonutChart';

function VotingRate({ votingResult }: { votingResult: VotingResult }) {
  const { voter_turnout } = votingResult;
  const { total_votes, valid_votes, invalid_votes } = votingResult.votes;

  const figures = [
    { label: '投票數', value: numberWithCommas(total_votes) },
    { label: '投票率', value: voter_turnout.toFixed(2) },
    { label: '有效票數', value: numberWithCommas(valid_votes) },
    { label: '無效票', value: numberWithCommas(invalid_votes) },
  ];
  return (
    <div className='flex items-center gap-8 xs:gap-10 bg-white p-4 xs:px-6 xs:py-[30px] rounded-xl'>
      <DonutChart size={125} label='投票率' value={voter_turnout / 100} />
      <div className='grid grid-cols-1 xs:grid-cols-2 md:gap-x-10 gap-y-4'>
        {figures.map((_figure) => (
          <div
            key={_figure.label}
            className='min-w-[120px] md:min-w-[140px] flex flex-col gap-0.5'
          >
            <p className='body-small !text-text-secondary'>{_figure.label}</p>
            <p className='heading-6'>{_figure.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingRate;
