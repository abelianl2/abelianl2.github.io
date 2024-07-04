import { http, createConfig } from "wagmi";
// import { mainnet, sepolia } from "wagmi/chains";
import {
  CHAIN_CURRENCY,
  CHAIN_ID,
  CHAIN_NAME,
  RPC_URL,
} from "../utils/web3Modal";
const customChain = {
  id: CHAIN_ID,
  name: CHAIN_NAME,
  isTestnet: false, // 是否是测试网
  nativeCurrency: {
    name: CHAIN_NAME,
    symbol: CHAIN_CURRENCY,
    decimals: 18, // 原生代币的小数位数
  },
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api",
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
