import { type Candidate, type Statics } from '@/types/index';
import PercentageBar from '@/components/UI/PercentageBar';
import { getOrderedVoteResult } from '@/pageFunctions/election-data';

function VotingTableRow({
  candidates,
  statistics,
}: {
  candidates: Candidate[];
  statistics: Statics;
}) {
  const { name, votes, voter_turnout } = statistics;

  const { orderedCandiData, barGroups } = getOrderedVoteResult({
    candidates,
    statistics,
  });

  return (
    <tr className='cursor-pointer text-text-primary hover:bg-hover border-b-[1px] border-line'>
      <td className='heading-6 px-2 py-2.5'>{name}</td>
      <td className='px-2 py-2.5'>
        <PercentageBar height={8} groups={barGroups} />
      </td>
      <td className='px-2 py-2.5'>{orderedCandiData[0].cand_name}</td>
      <td className='px-2 py-2.5'>{votes.total_votes}</td>
      <td className='px-2 py-2.5'>{(+voter_turnout).toFixed(2) + '%'}</td>
      <td className='px-2 py-2.5 w-10'>{`>`}</td>
    </tr>
  );
}

function AreaVotingTable({
  candidates = [],
  statisticsArr = [],
}: {
  candidates: Candidate[];
  statisticsArr: Statics[];
}) {
  const headers = ['縣市', '得票率', '當選人', '投票數', '投票率', ' '];
  return (
    <table className='w-full table-auto'>
      <thead className='bg-background'>
        <tr>
          {headers.map((_header) => (
            <th className='text-left p-2 body-small' key={_header}>
              {_header}
            </th>
          ))}
        </tr>
      </thead>
      {/* TODO order , children server comp */}
      <tbody>
        {statisticsArr.map((_static) => (
          <VotingTableRow
            key={_static.name}
            statistics={_static}
            candidates={candidates}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AreaVotingTable;
