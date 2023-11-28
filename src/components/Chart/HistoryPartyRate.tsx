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

import type { PreviousPartyVotes } from '@/types';
import { partyColors, options } from '@/constants/chart';
import { getUniqueParties } from '@/pageFunctions/election-data';
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

function HistoryPartyRate({
  historyPartyVotes: ascData,
}: {
  historyPartyVotes: PreviousPartyVotes[];
}) {
  const allUniqueParties = getUniqueParties(ascData);

  const data = {
    labels: ascData.map((_item) => _item.year).reverse(),
    datasets: allUniqueParties.map((_party) => {
      const id = _party.id as keyof typeof partyColors;
      return {
        label: _party.name,
        data: ascData
          .map((_item) => {
            const total = _item.party_votes.reduce(
              (_acc, _cur) => _acc + _cur.value,
              0,
            );

            return (
              (_item.party_votes.find((_vote) => _vote.id === id)?.value || 0) /
              total
            );
          })
          .reverse(),
        backgroundColor: partyColors[id],
        borderColor: partyColors[id],
      };
    }),
  };

  return (
    <ChartWrapper>
      <Line options={chartOptions} data={data} />
    </ChartWrapper>
  );
}

export default HistoryPartyRate;
