export const partyColors = {
  'party-1': '#8082FF',
  'party-2': '#F4A76F',
  'party-3': '#57D2A9',
} as const;

export const options = {
  responsive: { responsive: true, maintainAspectRatio: false },
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
    color: '#334155',
    align: 'start' as const,
    padding: 0,
    font: {
      size: 20,
    },
  },
  tooltip: {
    mode: 'index',
    boxWidth: 8,
    boxHeight: 8,
    boxPadding: 8,
    padding: 16,
    borderWidth: 1,
    usePointStyle: true,
    borderColor: '#DEE2E6',
    titleColor: '#334155',
    titleMarginBottom: 10,
    titleFont: { size: 18 },
    bodyColor: '#334155',
    bodySpacing: 10,
    bodyAlign: 'left',
    bodyFont: { size: 15, weight: 'normal' },
    backgroundColor: '#FFFFFF',
  },
};
