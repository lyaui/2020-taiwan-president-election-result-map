export const partyColors = {
  'party-1': '#8082FF',
  'party-2': '#F4A76F',
  'party-3': '#57D2A9',
} as const;

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
        color: '#334155',
        padding: 20,
      },
    },
    title: {
      display: true,
      text: '',
      color: '#334155',
      align: 'start',
      padding: 0,
      font: {
        size: 20,
      },
    },
  },
};
