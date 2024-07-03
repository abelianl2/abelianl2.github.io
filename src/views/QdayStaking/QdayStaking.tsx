import { useEffect, useRef, useState } from "react";
// import logo from "../../assets/abel/logo.svg";
// import wel from "../../assets/abel/welcome.svg";
import CardBG from "./CardBG";
import ProtlifolioCard from "./ProtlifolioCard";
import StakingCard from "./StakingCard";
import StakingTable from "./StakingTable";
import qdayCoreABI from "../../assets/json/QdayCore.json";
import veyABI from "../../assets/json/VeQday.json";
import wablABI from "../../assets/json/WAbl.json";
import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import {
  RPC_URL,
  getContractInstance,
  qdayContract,
  veContract,
  wabelContract,
} from "../../utils/web3Modal";

import { UserStakeItem } from "./type";
import ToStakeCard from "./ToStakeCard";
import { JsonRpcProvider } from "ethers";
import TotalCard from "./TotalCard";
import VeQDayCard from "./VeQDayCard";
import WabelCard from "./WabelCard";

export default function QdayStaking() {
  const [loadingTable, setLoading] = useState(false);

  const provider = useRef<ethers.ContractRunner>();
  const contractCore = useRef<ethers.Contract>();
  const contractVe = useRef<ethers.Contract>();
  const contractWebl = useRef<ethers.Contract>();
  const { address, isConnected } = useWeb3ModalAccount();
  const [totalStake, setTotalStake] = useState();
  const [userStake, setUserStake] = useState<Array<UserStakeItem>>([]);

  const handleInitContract = async () => {
    provider.current = new JsonRpcProvider(RPC_URL);
    setLoading(true);
    try {
      contractCore.current = await getContractInstance(
        provider.current,
        qdayContract,
        qdayCoreABI.abi
      );
      contractVe.current = await getContractInstance(
        provider.current,
        veContract,
        veyABI.abi
      );
      contractWebl.current = await getContractInstance(
        provider.current,
        wabelContract,
        wablABI.abi
      );
      console.warn("type", contractCore.current);
      const res = await contractCore.current?.totalStake();
      console.log("res", res.toString());
      setTotalStake(res);
      const res2 = await contractCore.current?.userStake(address);
      console.log("定账户质押金额", res2.toString());
      const res3 = await contractWebl.current?.lockedBalance(address);
      console.log("指定账户锁仓总额", res3.toString());
      const res4 = await contractWebl.current?.lockedDetail(address);

      console.log("锁仓详情列表", res4.toString());
    } catch (err) {
      console.error("err", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isConnected && address) {
      handleInitContract();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, isConnected, address]);

  return (
    <div className="page-abelstaking">
      <div className="flex flex-col gap-14px">
        <CardBG>
          <TotalCard />
        </CardBG>
        <div className="mt-30px">
          <ToStakeCard qdayCoreContract={contractCore} />
        </div>
        <CardBG>
          <VeQDayCard />
        </CardBG>
        <div className="mt-30px">
          <WabelCard />
        </div>
      </div>
    </div>
  );
}
