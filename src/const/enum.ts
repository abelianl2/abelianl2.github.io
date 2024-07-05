export const isProd = import.meta.env.VITE_ENV === "prod";

const lockUpPeriod_prod = [
  { value: 6, label: "6 Month", ratio: 1 },
  { value: 9, label: "9 Month", ratio: 2 },
  { value: 12, label: "12 Month", ratio: 3 },
];

const lockUpPeriod_dev = [
  { value: 1, label: "1 H", ratio: 1 },
  { value: 2, label: "2 H", ratio: 2 },
  { value: 3, label: "3 H", ratio: 3 },
];

export const lockUpPeriod = isProd ? lockUpPeriod_dev : lockUpPeriod_prod;
