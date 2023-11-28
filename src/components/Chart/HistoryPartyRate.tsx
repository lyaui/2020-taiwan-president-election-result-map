'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { type ChartOptions, type TooltipOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { partyColors, options } from '@/constants/chart';
import ChartWrapper from '@/components/Chart/ChartWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const chartOptions: ChartOptions<'line'> = {
  ...options.responsive,
  scales: {
    y: {
      ticks: {
        callback(value: number | string) {
          return +value * 100 + '%';
        },
      },
    },
  },
  plugins: {
    legend: { ...options.legend },
    title: {
      ...options.title,
      text: '歷屆政黨得票率',
    },
    tooltip: {
      ...options.tooltip,
      callbacks: {
        title(context) {
          return context[0].label + ' 年得票率';
        },
        label(context) {
          const partyName = `${context.dataset.label}             `;
          const partyValue = `${(+context.formattedValue * 100).toFixed(2)}`;
          return `${partyName}${partyValue}%`;
        },
      },
    } as TooltipOptions<'line'>,
  },
};

function HistoryPartyRate({ prePartyVotes: ascData }) {
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
        .map((_item) => {
          const total = _item.party_votes.reduce(
            (_acc, _cur) => _acc + _cur.value,
            0,
          );
          return (
            _item.party_votes.find((_vote) => _vote.id === _party.id).value /
            total
          );
        })
        .reverse(),
      backgroundColor: partyColors[_party.id],
      borderColor: partyColors[_party.id],
    })),
  };

  return (
    <ChartWrapper>
      <Line options={chartOptions} data={data} />
    </ChartWrapper>
  );
}

export default HistoryPartyRate;
