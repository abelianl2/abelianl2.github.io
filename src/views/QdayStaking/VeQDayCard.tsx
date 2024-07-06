import { Input, Button, message } from "antd";
import { useWriteContract } from "wagmi";
import {
  RPC_URL,
  coreContract,
  getContractInstance,
  veContract,
} from "../../utils/web3Modal";
import QDayABI from "../../assets/json/QdayCore.json";
import VeQDayABI from "../../assets/json/VeQday.json";
import { ethers, parseEther } from "ethers";
import { useEffect, useRef, useState } from "react";
import { eventBus } from "../../events/events";
import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function VeQDayCard() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const provider = new JsonRpcProvider(RPC_URL);
  const veqdayContractIns = useRef<Contract>();
  const { address, isConnected } = useWeb3ModalAccount();
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [messageApi, MessageContext] = message.useMessage();
  const {
    data: hash,
    writeContract: writeVeQdayContract,
    error: veDayErr,
  } = useWriteContract();
  const {
    data: hash2,
    writeContract: writeQdayContract,
    error: qDayErr,
  } = useWriteContract();
  const {
    data: hash4,
    writeContract: writeDepositContract,
    error: depositErr,
  } = useWriteContract();
  const {
    data: hash5,
    writeContract: writeArrroveContract,
    error: approveErr,
  } = useWriteContract();
  const {
    data: hash6,
    writeContract: writeUnstakeContract,
    error: unStakeErr,
  } = useWriteContract();

  const [val, setVal] = useState("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [isApprove, setIsApprove] = useState(false);
  const [val3, setVal3] = useState("");
  const handleVeStake = () => {
    if (!val) {
      return;
    }
    setLoading(true);
    // VEQday 质押
    writeVeQdayContract({
      address: coreContract,
      abi: QDayABI.abi,
      functionName: "stake",
      args: [parseEther(val)],
    });
  };
  // 兑换 VeQday
  const handleDesposit = () => {
    if (!val3) {
      return;
    }
    setLoading6(true);
    writeDepositContract({
      address: veContract,
      abi: VeQDayABI.abi,
      functionName: "deposit",
      value: parseEther(val3),
    });
  };
  // 质押Qday
  const handleQdayStake = () => {
    if (!val1) {
      return;
    }
    setLoading2(true);

    writeQdayContract({
      address: coreContract,
      abi: QDayABI.abi,
      functionName: "stakeWithQday",
      value: parseEther(val1),
    });
  };
  // VEQday解除质押
  const handleUnStake = () => {
    if (!val2) {
      return;
    }
    setLoading4(true);
    writeUnstakeContract({
      address: coreContract,
      abi: QDayABI.abi,
      functionName: "unstakeWithQday",
      args: [parseEther(val2)],
    });
  };

  const MessageKey = "updatableMsg";
  const handleLoadReceipt = async (hash: string, type: string = "交易") => {
    messageApi.open({
      duration: 0,
      type: "loading",
      content: `${type}中请稍后...`,
      key: MessageKey,
    });
    const receipt = await provider.waitForTransaction(hash);
    if (receipt?.status) {
      messageApi.open({
        content: `${type}成功`,
        type: "success",
        key: MessageKey,
      });
      eventBus.emit("updateEvent");
    } else {
      messageApi.open({
        content: `${type}失败`,
        type: "error",
        key: MessageKey,
      });
    }
    setLoading(false);
    setLoading6(false);
    setLoading2(false);
    setLoading4(false);
    setLoading5(false);
  };
  // 授权合约
  const handleApprove = () => {
    setLoading5(true);
    writeArrroveContract({
      address: veContract,
      abi: VeQDayABI.abi,
      functionName: "approve",
      args: [coreContract, ethers.MaxUint256],
    });
  };
  useEffect(() => {
    hash && handleLoadReceipt(hash, "质押veQDay");
    hash2 && handleLoadReceipt(hash2, "质押QDay");
    hash6 && handleLoadReceipt(hash6, "解除质押");
    hash5 &&
      handleLoadReceipt(hash5, "授权").then(() => {
        getIsApprove();
      });

    hash4 && handleLoadReceipt(hash4, "兑换VeQday");
    if (unStakeErr || qDayErr || veDayErr || approveErr || depositErr) {
      const msg = unStakeErr || qDayErr || veDayErr || approveErr || depositErr;
      if (msg) {
        messageApi.error(msg.message);
      }
      setLoading(false);
      setLoading6(false);
      setLoading2(false);
      setLoading4(false);
      setLoading5(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hash,
    hash2,
    hash6,
    hash4,
    unStakeErr,
    qDayErr,
    veDayErr,
    hash5,
    approveErr,
    depositErr,
  ]);

  const handleInitContract = async () => {
    veqdayContractIns.current = await getContractInstance(
      provider,
      veContract,
      VeQDayABI.abi
    );
    getIsApprove();
  };
  // 查询授权状态
  const getIsApprove = async () => {
    const v = await veqdayContractIns.current?.allowance(address, coreContract);
    setIsApprove(Boolean(v));
  };

  useEffect(() => {
    if (address && isConnected) {
      handleInitContract();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);
  return (
    <div>
      <div className="flex justify-between h-120px">
        {MessageContext}
        <div className="w-46% h-100% flex flex-col justify-between  px-10px">
          <div className="flex items-center justify-between">
            <div className="w-60%">
              <Input
                value={val}
                type="number"
                onChange={(e) => setVal(e.target.value)}
                placeholder="请输入待质押veQDay数量"
              />
            </div>
            <div>
              {isApprove ? (
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleVeStake}
                >
                  veQDay质押
                </Button>
              ) : (
                <Button
                  type="primary"
                  loading={loading5}
                  onClick={handleApprove}
                >
                  授权
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-60%">
              <Input
                value={val1}
                type="number"
                onChange={(e) => setVal1(e.target.value)}
                placeholder="请输入待质押QDay数量"
              />
            </div>
            <div>
              <Button
                type="primary"
                loading={loading2}
                onClick={handleQdayStake}
              >
                QDay质押
              </Button>
            </div>
          </div>
        </div>
        <div className="w-46% h-100% flex flex-col justify-between  px-10px">
          <div className="flex items-center justify-between">
            <div className="w-60%">
              <Input
                value={val2}
                type="number"
                onChange={(e) => setVal2(e.target.value)}
                placeholder="请输入解除质押的数量"
              />
            </div>
            <div>
              <Button type="primary" loading={loading4} onClick={handleUnStake}>
                解除质押
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-60%">
              <Input
                value={val3}
                type="number"
                onChange={(e) => setVal3(e.target.value)}
                placeholder="请输入兑换VeQDay的数量"
              />
            </div>
            <div>
              <Button
                type="primary"
                loading={loading6}
                onClick={handleDesposit}
              >
                兑换 VeQday
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <Button type="primary" loading={loading6} onClick={handleApprove}>
          Approve
        </Button>
      </div> */}
    </div>
  );
}
