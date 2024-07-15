import { Web3Modal } from "@web3modal/ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import {
  CHAIN_CURRENCY,
  CHAIN_DECLIMALS,
  CHAIN_ID,
  CHAIN_LOGO,
  CHAIN_NAME,
  DESCRIPTION,
  DOMAIN_HOST,
  EXPLORER_URL,
  PROJECT_ID,
  RPC_URL,
} from "../const/enum";

// 2. Set chains
export const myMainnet = {
  chainId: CHAIN_ID,
  name: CHAIN_NAME,
  currency: CHAIN_CURRENCY,
  explorerUrl: EXPLORER_URL,
  rpcUrl: RPC_URL,
  declimals: CHAIN_DECLIMALS,
};

// 3. Create a metadata object
const metadata = {
  name: CHAIN_NAME,
  description: DESCRIPTION,
  url: DOMAIN_HOST, // origin must match your domain & subdomain
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
  projectId: PROJECT_ID,
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
