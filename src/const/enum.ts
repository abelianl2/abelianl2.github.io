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

// 项目id 通过 walletConnect cloud创建
export const PROJECT_ID = import.meta.env.VITE_PROJECTID;

// 官网域名
export const DOMAIN_HOST = import.meta.env.VITE_HOST;

// 链配置
export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;
export const RPC_URL = import.meta.env.VITE_RPC_URL;
export const CHAIN_NAME = import.meta.env.VITE_CHAIN_NAME;
export const CHAIN_CURRENCY = import.meta.env.VITE_CHAIN_CURRENCY;
export const CHAIN_LOGO = `${DOMAIN_HOST}/src/assets/icon.svg`;
export const DESCRIPTION = import.meta.env.VITE_DESCRIPTION;
export const CHAIN_DECLIMALS = Number(import.meta.env.VITE_CHAIN_DECLIMALS);
// 区块浏览器配置
export const EXPLORER_URL = import.meta.env.VITE_EXPLORER_URL;
export const EXPLORER_NAME = import.meta.env.EXPLORER_NAME;
export const EXPLORER_API_URL = import.meta.env.VITE_EXPLORER_API_URL;
