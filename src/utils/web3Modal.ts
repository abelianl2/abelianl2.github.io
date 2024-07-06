import { Web3Modal } from "@web3modal/ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ethers } from "ethers";

// 合约地址
export const coreContract = "0xa0FC8C387d50C4c2131dF140984d6A9E32e7F570";
export const wabelContract = "0x69A986a954dee0178D9A01c8B07c9B3a036ce5Aa";
export const veContract = "0x0bEf7d8403E24c245158A088bb94CC2940B2DFa1";
// 项目id 通过 walletConnect cloud创建
export const projectId = "fcecdc049765b0a170b43b92bba0ccf3";

// 官网域名
export const VITE_HOST = import.meta.env.VITE_HOST;

// 链配置
export const CHAIN_ID = 1001;
export const RPC_URL = "http://159.138.82.123:8123";
export const CHAIN_NAME = "QDay";
export const CHAIN_CURRENCY = "QDAY";
export const CHAIN_LOGO = `${VITE_HOST}/src/assets/icon.svg`;
export const EXPLORERURL = "https://etherscan.io";
export const DESCRIPTION = "My Website description";
// 2. Set chains
export const myMainnet = {
  chainId: CHAIN_ID,
  name: CHAIN_NAME,
  currency: CHAIN_CURRENCY,
  explorerUrl: EXPLORERURL,
  rpcUrl: RPC_URL,
};

// 3. Create a metadata object
const metadata = {
  name: CHAIN_NAME,
  description: DESCRIPTION,
  url: VITE_HOST, // origin must match your domain & subdomain
  icons: [CHAIN_LOGO],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: RPC_URL, // used for the Coinbase SDK
  defaultChainId: CHAIN_ID, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
export const web3Modal: Web3Modal = createWeb3Modal({
  ethersConfig,
  chains: [myMainnet],
  projectId,
  enableAnalytics: false, // 默认使用云配置
});

export async function getContractInstance(
  provider: ethers.ContractRunner,
  contractAddress: string,
  contractABI: ethers.InterfaceAbi
) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    return contract;
  } catch (err) {
    console.error("err- contract", err);
  }
}
