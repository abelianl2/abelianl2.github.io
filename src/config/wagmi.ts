import { http, createConfig } from "wagmi";
import {
  CHAIN_CURRENCY,
  CHAIN_DECLIMALS,
  CHAIN_ID,
  CHAIN_NAME,
  EXPLORER_API_URL,
  EXPLORER_NAME,
  EXPLORER_URL,
  RPC_URL,
} from "../const/enum";

const customChain = {
  id: CHAIN_ID,
  name: CHAIN_NAME,
  isTestnet: false, // 是否是测试网
  nativeCurrency: {
    name: CHAIN_NAME,
    symbol: CHAIN_CURRENCY,
    decimals: CHAIN_DECLIMALS, // 原生代币的小数位数
  },
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: EXPLORER_NAME,
      url: EXPLORER_URL,
      apiUrl: EXPLORER_API_URL,
    },
  },
  contracts: {}, // 可选
};
export const config = createConfig({
  chains: [customChain],
  transports: {
    [customChain.id]: http(),
  },
});
