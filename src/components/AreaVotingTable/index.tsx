import { type Candidate, type VotingResult } from '@/types/index';
import VotingTableRow from '@/components/AreaVotingTable/VotingTableRow';

function AreaVotingTable({
  candidates = [],
  votingResultArr = [],
}: {
  candidates: Candidate[];
  votingResultArr: VotingResult[];
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
