'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { partyColors } from '@/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  barThickness: 20,

  categoryPercentage: 0.8,
  barPercentage: 0.5,
};

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
    })),
  };

  return <Bar options={options} data={data} />;
}

export default HistoryPartyVotes;
