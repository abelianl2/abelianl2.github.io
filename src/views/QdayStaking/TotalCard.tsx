import { useEffect, useRef, useState } from "react";
import { RPC_URL, getContractInstance } from "../../utils/web3Modal";
import { JsonRpcProvider, ethers, formatEther } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getMsgKey, toFixed } from "../../utils/utils";
import { Button, message } from "antd";
import qdayCoreABI from "../../assets/json/QdayCore.json";
import veyABI from "../../assets/json/VeQday.json";
import wablABI from "../../assets/json/WAbl.json";
import { eventBus } from "../../events/events";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { coreContract, veContract, wabelContract } from "../../const/enum";
export default function TotalCard() {
  const [balance, setBalance] = useState("0");
  const [messageApi, messageContext] = message.useMessage();
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
  const [mywabelBalance, setMywabelBalance] = useState("0");
  const [myqdayBalance, setMyqdayBalance] = useState("0");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetData = async () => {
    try {
      console.warn("type", contractCore.current);
      const res: bigint = await contractCore.current?.totalStake();
      setTotalStake(formatEther(res ? res.toString() : "0"));
      const res2 = await contractCore.current?.userStake(address);

      setUserStakeVal(formatEther(res2 ? res2.toString() : "0"));
      const totReward = await contractCore.current?.totalReward();
      setTotalReward(formatEther(totReward ? totReward.toString() : "0"));
      const mReward = await contractCore.current?.claimedReward(address);
      setMyReward(formatEther(mReward ? mReward.toString() : "0"));
      const res6 = await contractCore.current?.unlockedReward(address);
      setUnLockReward(formatEther(res6 ? res6.toString() : "0"));
      const res5 = await contractWebl.current?.lockedBalance(address);
      setmywabel(formatEther(res5 ? res5.toString() : "0"));
      // 查询我的WEBAL
      const res7 = await contractWebl.current?.balanceOf(address);
      console.log("res7", res7.toString());
      setMywabelBalance(formatEther(res7 ? res7.toString() : "0"));
      // 查询我的veQday
      const res8 = await contractVe.current?.balanceOf(address);
      console.log("res8", res8.toString());

      setMyqdayBalance(formatEther(res8 ? res8.toString() : "0"));
    } catch (err) {
      console.error("err", err);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInitContract = async () => {
    if (!contractCore.current || !contractVe.current || contractWebl.current) {
      contractCore.current = await getContractInstance(
        provider,
        coreContract,
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

  const {
    data: hash,
    writeContract: writeUnlock,
    error: unLockErr,
    isPending: unLockPending,
  } = useWriteContract();
  const {
    data: hash2,
    writeContract: writeWithdraw,
    error: withDrawErr,
    isPending: withdrawPending,
  } = useWriteContract();
  const { isSuccess: unLockConfirmed, isLoading: unLoading } =
    useWaitForTransactionReceipt({
      hash,
    });
  const { isSuccess: withdrawConfirmed, isLoading: WithdrawLoading } =
    useWaitForTransactionReceipt({
      hash: hash2,
    });
  const handleGetBalance = async () => {
    if (address) {
      const b = await provider.getBalance(address);
      const bs = formatEther(BigInt(b).toString());
      setBalance(toFixed(bs) + "");
    }
  };
  // 重置数据
  const handleResetData = () => {
    setTotalStake("0");
    setUserStakeVal("0");
    setTotalReward("0");
    setMyReward("0");
    setUnLockReward("0");
    setmywabel("0");
    setMywabelBalance("0");
    setMyqdayBalance("0");
    setBalance("0");
  };
  const handleUpdate = () => {
    handleGetBalance();
    handleInitContract();
  };
  useEffect(() => {
    let t = null;
    if (address && isConnected) {
      handleUpdate();
      t = setInterval(handleUpdate, 7000);
    } else {
      handleResetData();
    }
    return () => {
      if (t) clearInterval(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);
  // 解锁
  const handleUnlock = () => {
    writeUnlock({
      abi: wablABI.abi,
      address: wabelContract,
      args: [address],
      functionName: "unlock",
    });
  };

  // 提现
  const handleWithDraw = () => {
    writeWithdraw({
      abi: qdayCoreABI.abi,
      address: coreContract,
      args: [address],
      functionName: "withdrawReward",
    });
  };
  const handleShowLoading = (type: string, key: string) => {
    messageApi.open({
      duration: 0,
      type: "loading",
      content: `${type}中请稍后...`,
      key,
    });
  };
  const handleShowSuccess = (type: string, key: string) => {
    messageApi.destroy();
    messageApi.open({
      content: `${type}成功`,
      type: "success",
      key,
      duration: 3,
    });
    handleUpdate();
  };

  useEffect(() => {
    if (unLoading || unLockConfirmed) {
      const key = getMsgKey();
      if (unLoading) {
        handleShowLoading("解锁", key);
      }
      if (unLockConfirmed) {
        handleShowSuccess("解锁", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unLockConfirmed, unLoading]);

  useEffect(() => {
    if (WithdrawLoading || withdrawConfirmed) {
      const key = getMsgKey();
      if (WithdrawLoading) {
        handleShowLoading("提现", key);
      }
      if (unLockConfirmed) {
        handleShowSuccess("提现", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawConfirmed, WithdrawLoading]);
  useEffect(() => {
    if (unLockErr || withDrawErr) {
      const msg = unLockErr || withDrawErr;
      messageApi.error(msg?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withDrawErr, unLockErr]);

  useEffect(() => {
    eventBus.on("updateEvent", handleUpdate);
    return () => {
      eventBus.off("updateEvent", handleUpdate);
    };
  });

  return (
    <div className="flex  h-120px font-size-12px gap-10px">
      {messageContext}
      <div className="flex-1 w-20% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>全网质押veQday</div>
          <div>{totalStake}QDAY</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>我的锁仓wAbel</div>
          <div>
            {toFixed(mywabel, 6)}QDAY{" "}
            <Button
              type="primary"
              className="h-24px ml-20px"
              disabled={Number(mywabel) <= 0 ? true : false}
              loading={unLockPending}
              onClick={handleUnlock}
            >
              解锁wAbel
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-20% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我的质押veQday</div>
          <div>{toFixed(userStakeVal, 6)}QDAY</div>
        </div>

        <div className="flex flex-col justify-between">
          <div>待提现奖金</div>
          <div>
            {toFixed(unLockReward, 6)}QDAY{" "}
            <Button
              type="primary"
              className="h-24px  ml-20px"
              loading={withdrawPending}
              disabled={Number(unLockReward) <= 0 ? true : false}
              onClick={handleWithDraw}
            >
              提现奖励
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-20% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我的wAbel</div>
          <div>{toFixed(mywabelBalance, 6)}QDAY</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>我的veQday</div>
          <div>{toFixed(myqdayBalance, 6)}QDAY</div>
        </div>
      </div>

      <div className="flex-1 w-20% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我的收益</div>
          <div>{toFixed(myReward, 6)}QDAY</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>全网总收益</div>
          <div>{toFixed(totalReward, 6)}QDAY</div>
        </div>
      </div>
      <div className="flex-1 w-20% h-100% flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <div>我的余额</div>
          <div>{toFixed(balance, 6)} QDAY</div>
        </div>
      </div>
    </div>
  );
}
