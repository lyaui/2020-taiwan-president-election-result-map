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
          <th className='body-small p-2 text-left'>地區</th>
          <th className='body-small p-2 text-left'>
            <div className='hidden xs:table-cell'>得票率</div>
          </th>
          <th className='body-small hidden p-2 text-left xs:table-cell'>
            當選人
          </th>
          <th className='body-small hidden p-2 text-left sm:table-cell'>
            投票數
          </th>
          <th className='body-small hidden p-2 text-left sm:table-cell'>
            投票率
          </th>
          <th className='body-small p-2 text-left'></th>
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
