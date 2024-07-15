export const isProd = import.meta.env.VITE_ENV === "prod";
export const isTest = import.meta.env.VITE_ENV === "test";
export const isDev = import.meta.env.VITE_ENV === "dev";
const lockUpPeriod_prod = [
  { value: 180, label: "6 Month", ratio: 1 },
  { value: 270, label: "9 Month", ratio: 2 },
  { value: 360, label: "12 Month", ratio: 3 },
];

const lockUpPeriod_dev = [
  { value: 1, label: "1 H", ratio: 1 },
  { value: 2, label: "2 H", ratio: 2 },
  { value: 3, label: "3 H", ratio: 3 },
];

export const lockUpPeriod = isProd ? lockUpPeriod_prod : lockUpPeriod_dev;

export const coreContract = import.meta.env.VITE_QDAYCORE;
export const wabelContract = import.meta.env.VITE_WABEL;
export const veContract = import.meta.env.VITE_VEQDAY;

export const apiPath = import.meta.env.VITE_API_PATH;
