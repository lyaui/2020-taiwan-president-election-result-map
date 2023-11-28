'use client';

import { useSearchParams } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { type ChartOptions, type TooltipOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import type { PreviousPartyVotes } from '@/types';
import { partyColors, options } from '@/constants/chart';
import { numberWithCommas } from '@/utils/index';
import { getUniqueParties } from '@/pageFunctions/election-data';
import ChartWrapper from '@/components/Chart/ChartWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
);

function HistoryPartyVotes({
  historyPartyVotes: ascData,
}: {
  historyPartyVotes: PreviousPartyVotes[];
}) {
  const searchParams = useSearchParams();
  const dist = searchParams.get('dist');

  const chartOptions: ChartOptions<'bar'> = {
    ...options.responsive,
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => {
            return dist
              ? numberWithCommas(+value / 1000) + '千'
              : numberWithCommas(+value / 10000) + '萬';
          },
        },
      },
    },
    plugins: {
      legend: { ...options.legend },
      title: {
        ...options.title,
        text: '歷屆政黨得票數',
      },
      tooltip: {
        ...options.tooltip,
        callbacks: {
          title(context) {
            return context[0].label + ' 年得票數';
          },
          label(context) {
            const partyName = `${context.dataset.label}             `;
            const partyValue = `${context.formattedValue}`;
            return `${partyName}${partyValue} 票`;
          },
        },
      } as TooltipOptions<'bar'>,
    },
  };

  const allUniqueParties = getUniqueParties(ascData);

  const data = {
    labels: ascData.map((_item) => _item.year).reverse(),
    datasets: allUniqueParties.map((_party) => {
      const id = _party.id as keyof typeof partyColors;
      return {
        label: _party.name,
        data: ascData
          .map(
            (_item) =>
              _item.party_votes.find((_vote) => _vote.id === id)?.value || 0,
          )
          .reverse(),
        backgroundColor: partyColors[id],
        borderRadius: 5,
        barThickness: 18,
      };
    }),
  };

  return (
    <ChartWrapper>
      <Bar options={chartOptions} data={data} />
    </ChartWrapper>
  );
}

export default HistoryPartyVotes;
