export const monthlyOptions = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  states: {
    hover: {
      filter: { type: 'none' },
    },
    active: {
      filter: { type: 'none' },
    },
  },
  xaxis: {
    categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: {
    show: true,
    tickAmount: 4,
    labels: {
      offsetX: -17,
      formatter: (value: any) => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`,
    },
  },
};

export const yearlyOptions = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  states: {
    hover: {
      filter: { type: 'none' },
    },
    active: {
      filter: { type: 'none' },
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: {
    show: true,
    tickAmount: 4,
    labels: {
      offsetX: -17,
      formatter: (value: any) => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`,
    },
  },
};
