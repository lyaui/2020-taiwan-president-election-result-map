import { numberWithCommas } from '@/utils/index';
import PercentageBar from '@/components/UI/PercentageBar';

function AreaVotingTable() {
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
      {/* TODO order */}
      <tbody>
        <tr className='cursor-pointer text-text-primary hover:bg-hover border-b-[1px] border-line'>
          <td className='heading-6 px-2 py-2.5'>南投市</td>
          <td className='px-2 py-2.5'>
            <PercentageBar
              height={8}
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
          </td>
          <td className='px-2 py-2.5'>德古拉</td>
          <td className='px-2 py-2.5'>{numberWithCommas(1653834)}</td>
          <td className='px-2 py-2.5'>{0.7631 * 100 + '%'}</td>
          <td className='px-2 py-2.5 w-10'>{`>`}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default AreaVotingTable;
