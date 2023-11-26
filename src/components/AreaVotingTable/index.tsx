import { type Candidate, type VotingResult } from '@/types/index';
import VotingTableRow from '@/components/AreaVotingTable/VotingTableRow';

function AreaVotingTable({
  candidates = [],
  votingResultArr = [],
}: {
  candidates: Candidate[];
  votingResultArr: VotingResult[];
}) {
  return (
    <table className='w-full table-auto'>
      <thead className='bg-background'>
        <tr>
          <th className='text-left p-2 body-small'>地區</th>
          <th className='text-left p-2 body-small'>
            <div className='hidden xs:table-cell'>得票率</div>
          </th>
          <th className='hidden xs:table-cell text-left p-2 body-small'>
            當選人
          </th>
          <th className='hidden sm:table-cell text-left p-2 body-small'>
            投票數
          </th>
          <th className='hidden sm:table-cell text-left p-2 body-small'>
            投票率
          </th>
          <th className='text-left p-2 body-small'></th>
        </tr>
      </thead>
      <tbody>
        {votingResultArr.map((_result) => (
          <VotingTableRow
            key={_result.name}
            votingResult={_result}
            candidates={candidates}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AreaVotingTable;
