import { Web3Modal } from "@web3modal/ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Web3Wallet } from "@walletconnect/web3wallet";
import { Core } from "@walletconnect/core";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";

export const qdayContract = "0x5f8234E008C46e18b4dFc4ac1fD234A37A01DC33";
export const wabelContract = "0x5653937B965eC26630962CF7a36B5e72AEBA7307";
export const veContract = "0x766B72F9868819B4cC9e24F5976Fc997Eb42C3dC";
export const projectId = "fcecdc049765b0a170b43b92bba0ccf3";
export const CHAIN_ID = 1001;
export const VITE_HOST = import.meta.env.VITE_HOST;
// TODO required https
export const RPC_URL = "http://159.138.82.123:8123";
export const CHAIN_NAME = "QDay";
export const CHAIN_CURRENCY = "QDAY";
export const CHAIN_LOGO = `${VITE_HOST}/src/assets/icon.svg`;
// 2. Set chains
export const myMainnet = {
  chainId: CHAIN_ID,
  name: CHAIN_NAME,
  currency: CHAIN_CURRENCY,
  explorerUrl: "https://etherscan.io",
  rpcUrl: RPC_URL,
};

// 3. Create a metadata object
const metadata = {
  name: CHAIN_NAME,
  description: "My Website description",
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
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
export const web3Modal: Web3Modal = createWeb3Modal({
  ethersConfig,
  chains: [myMainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const core = new Core({
  projectId,
});
export const getWeb3Wallet = () => {
  return Web3Wallet.init({
    core,
    metadata,
  });
};

export const provider = EthereumProvider.init({
  projectId,
  metadata,
  showQrModal: false,
  optionalChains: [1, CHAIN_ID],
});

// export const getSignClient = () => {
//   return SignClient.init({
//     projectId,
//     // optional parameters
//     relayUrl: "<YOUR RELAY URL>",
//     metadata: metadata,
//   });
// };

export const getProvider = async () => {
  return await EthereumProvider.init({
    projectId,
    metadata,
    showQrModal: false,
    optionalChains: [1, CHAIN_ID],
  });
};

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
