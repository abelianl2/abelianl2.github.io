import { useEffect, useRef, useState } from "react";
import {
  RPC_URL,
  getContractInstance,
  qdayContract,
  veContract,
  wabelContract,
} from "../../utils/web3Modal";
import { JsonRpcProvider, ethers, formatEther } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toFixed } from "../../utils/utils";
import { Button } from "antd";
import qdayCoreABI from "../../assets/json/QdayCore.json";
import veyABI from "../../assets/json/VeQday.json";
import wablABI from "../../assets/json/WAbl.json";
import { eventBus } from "../../events/events";
export default function TotalCard() {
  const [balance, setBalance] = useState("0");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const provider = new JsonRpcProvider(RPC_URL);
  const contractCore = useRef<ethers.Contract>();
  const contractVe = useRef<ethers.Contract>();
  const contractWebl = useRef<ethers.Contract>();
  const { address, isConnected } = useWeb3ModalAccount();
  const [totalStake, setTotalStake] = useState("0");
  const [userStakeVal, setUserStakeVal] = useState("0");
  const [mywabel, setmywabel] = useState("0");
  const [unLockReward, setUnLockReward] = useState("0");
  const [totalReward, setTotalReward] = useState("0");
  const [myReward, setMyReward] = useState("0");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetData = async () => {
    try {
      console.warn("type", contractCore.current);
      const res: bigint = await contractCore.current?.totalStake();
      setTotalStake(toFixed(formatEther(res ? res.toString() : "0")) + "");
      const res2 = await contractCore.current?.userStake(address);

      setUserStakeVal(toFixed(formatEther(res2 ? res2.toString() : "0")) + "");
      const totReward = await contractCore.current?.totalReward();
      setTotalReward(
        toFixed(formatEther(totReward ? totReward.toString() : "0")) + ""
      );
      const mReward = await contractCore.current?.claimedReward(address);
      setMyReward(
        toFixed(formatEther(mReward ? mReward.toString() : "0")) + ""
      );
      const res6 = await contractCore.current?.unlockedReward(address);
      setUnLockReward(toFixed(formatEther(res6 ? res6.toString() : "0")) + "");
      // 查询我的WEBAL
      const res5 = await contractWebl.current?.lockedBalance(address);
      setmywabel(toFixed(formatEther(res5 ? res5.toString() : "0")) + "");
    } catch (err) {
      console.error("err", err);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInitContract = async () => {
    if (!contractCore.current || !contractVe.current || contractWebl.current) {
      contractCore.current = await getContractInstance(
        provider,
        qdayContract,
        qdayCoreABI.abi
      );
      contractVe.current = await getContractInstance(
        provider,
        veContract,
        veyABI.abi
      );
      contractWebl.current = await getContractInstance(
        provider,
        wabelContract,
        wablABI.abi
      );
    }
    handleGetData();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetBalance = async () => {
    if (address) {
      const b = await provider.getBalance(address);
      const bs = formatEther(BigInt(b).toString());
      setBalance(toFixed(bs) + "");
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdate = () => {
    handleGetBalance();
    handleInitContract();
  };
  useEffect(() => {
    if (address && isConnected) {
      handleUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  useEffect(() => {
    eventBus.on("updateEvent", () => {
      handleUpdate();
    });
    return () => {
      eventBus.off("updateEvent", handleInitContract);
    };
  });
  return (
    <div className="flex  h-120px font-size-12px gap-10px">
      <div className="flex-1 w-25% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>全网质押veQday</div>
          <div>{totalStake}QDAY</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>我的锁仓wAbel</div>
          <div>
            {mywabel}QDAY{" "}
            <Button type="primary" className="h-24px">
              解锁wAbel
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-25% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我的质押veQday</div>
          <div>{userStakeVal}QDAY</div>
        </div>

        <div className="flex flex-col justify-between">
          <div>待提现奖金</div>
          <div>
            {unLockReward}QDAY{" "}
            <Button type="primary" className="h-24px">
              提现奖励
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-25% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我的余额</div>
          <div>{balance} QDAY</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>全网总收益</div>
          <div>{totalReward}QDAY</div>
        </div>
      </div>
      <div className="flex-1 w-25% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我已提取的QDay收益</div>
          <div>{myReward}QDAY</div>
        </div>
      </div>
    </div>
  );
}
