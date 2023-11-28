'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { partyColors, options } from '@/constants/chart';
import ChartWrapper from '@/components/Chart/ChartWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
);

const chartOptions = { ...options };
chartOptions.plugins.title.text = '歷屆政黨得票數';

function HistoryPartyVotes({ prePartyVotes: ascData }) {
  const allParties = ascData.reduce((_acc, _cur) => {
    _cur.party_votes.forEach((_cur_party) => {
      if (_acc.findIndex((_party) => _party.id === _cur_party.id) === -1) {
        _acc.push({
          name: _cur_party.name,
          id: _cur_party.id,
        });
      }
    });
    return _acc;
  }, []);

  const data = {
    labels: ascData.map((_item) => _item.year).reverse(),
    datasets: allParties.map((_party) => ({
      label: _party.name,
      data: ascData
        .map(
          (_item) =>
            _item.party_votes.find((_vote) => _vote.id === _party.id).value,
        )
        .reverse(),
      backgroundColor: partyColors[_party.id],
      borderRadius: 5,
      barThickness: 18,
    })),
  };

  return (
    <ChartWrapper title='歷屆政黨得票率'>
      <Bar options={chartOptions} data={data} />
    </ChartWrapper>
  );
}

export default HistoryPartyVotes;
