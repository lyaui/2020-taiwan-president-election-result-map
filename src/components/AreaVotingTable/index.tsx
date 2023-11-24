import { type Candidate, type Statics } from '@/types/index';
import VotingTableRow from '@/components/AreaVotingTable/VotingTableRow';

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
