import { Input, Button, message } from "antd";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { RPC_URL, getContractInstance } from "../../utils/web3Modal";
import QDayABI from "../../assets/json/QdayCore.json";
import VeQDayABI from "../../assets/json/VeQday.json";
import { ethers, formatEther, parseEther } from "ethers";
import { useEffect, useRef, useState } from "react";
import { eventBus } from "../../events/events";
import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getMsgKey } from "../../utils/utils";
import { coreContract, veContract } from "../../const/enum";

export default function VeQDayCard() {
  const provider = new JsonRpcProvider(RPC_URL);
  const veqdayContractIns = useRef<Contract>();
  const { address, isConnected } = useWeb3ModalAccount();
  const [myveqday, setMyveqday] = useState("");
  const [messageApi, MessageContext] = message.useMessage();
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
    eventBus.emit("updateEvent");
  };
  const {
    data: hash,
    writeContract: writeVeQdayContract,
    error: veDayErr,
    isPending: pendding1,
  } = useWriteContract();
  const { isSuccess: scuuess1, isLoading: load1 } =
    useWaitForTransactionReceipt({
      hash,
    });
  const {
    data: hash2,
    writeContract: writeQdayContract,
    error: qDayErr,
    isPending: pendding2,
  } = useWriteContract();
  const { isSuccess: scuuess2, isLoading: load2 } =
    useWaitForTransactionReceipt({
      hash: hash2,
    });
  const {
    data: hash4,
    writeContract: writeDepositContract,
    error: depositErr,
    isPending: pendding4,
  } = useWriteContract();
  const { isSuccess: scuuess4, isLoading: load4 } =
    useWaitForTransactionReceipt({
      hash: hash4,
    });
  const {
    data: hash5,
    writeContract: writeArrroveContract,
    error: approveErr,
    isPending: pendding5,
  } = useWriteContract();
  const { isSuccess: scuuess5, isLoading: load5 } =
    useWaitForTransactionReceipt({
      hash: hash5,
    });
  const {
    data: hash6,
    writeContract: writeUnstakeContract,
    error: unStakeErr,
    isPending: pendding6,
  } = useWriteContract();
  const { isSuccess: scuuess6, isLoading: load6 } =
    useWaitForTransactionReceipt({
      hash: hash6,
    });
  const [val, setVal] = useState("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [isApprove, setIsApprove] = useState(false);
  const [approveVal, setApproveVal] = useState(0);
  const [val3, setVal3] = useState("");
  const handleVeStake = () => {
    if (!val) {
      return;
    }
    if (Number(myveqday) < Number(val)) {
      messageApi.warning("您的VeQday余额不足");
      return;
    }
    if (approveVal < Number(val)) {
      message.warning("授权额度不足");
      handleApprove();
      return;
    }
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
    writeUnstakeContract({
      address: coreContract,
      abi: QDayABI.abi,
      functionName: "unstakeWithQday",
      args: [parseEther(val2)],
    });
  };

  // 授权合约
  const handleApprove = () => {
    writeArrroveContract({
      address: veContract,
      abi: VeQDayABI.abi,
      functionName: "approve",
      args: [coreContract, ethers.MaxUint256],
    });
  };
  // 处理加载状态
  useEffect(() => {
    if (scuuess1 || load1) {
      const key = getMsgKey();
      if (load1) {
        handleShowLoading("质押veQDay", key);
      }
      if (scuuess1) {
        handleShowSuccess("质押veQDay", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scuuess1, load1]);
  useEffect(() => {
    if (scuuess2 || load2) {
      const key = getMsgKey();
      if (load2) {
        handleShowLoading("质押QDay", key);
      }
      if (scuuess2) {
        handleShowSuccess("质押QDay", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scuuess2, load2]);
  useEffect(() => {
    if (scuuess4 || load4) {
      const key = getMsgKey();
      if (load4) {
        handleShowLoading("兑换VeQday", key);
      }
      if (scuuess4) {
        handleShowSuccess("兑换VeQday", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scuuess4, load4]);
  useEffect(() => {
    if (scuuess5 || load5) {
      const key = getMsgKey();
      if (load5) {
        handleShowLoading("授权", key);
        getIsApprove();
      }
      if (scuuess5) {
        handleShowSuccess("授权", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scuuess5, load5]);
  useEffect(() => {
    if (scuuess6 || load6) {
      const key = getMsgKey();
      if (load6) {
        handleShowLoading("解除质押", key);
      }
      if (scuuess6) {
        handleShowSuccess("解除质押", key);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scuuess6, load6]);
  useEffect(() => {
    if (unStakeErr || qDayErr || veDayErr || approveErr || depositErr) {
      const msg = unStakeErr || qDayErr || veDayErr || approveErr || depositErr;
      if (msg) {
        messageApi.error(msg.message);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unStakeErr, qDayErr, veDayErr, approveErr, depositErr]);

  // 查詢我的veqday
  const getMyVeQday = async () => {
    const res8 = await veqdayContractIns.current?.balanceOf(address);
    setMyveqday(formatEther(res8 ? res8.toString() : "0"));
  };
  // 初始化合约实例
  const handleInitContract = async () => {
    veqdayContractIns.current = await getContractInstance(
      provider,
      veContract,
      VeQDayABI.abi
    );

    getIsApprove();
    getMyVeQday();
  };
  // 查询授权状态
  const getIsApprove = async () => {
    const v = await veqdayContractIns.current?.allowance(address, coreContract);
    setIsApprove(Boolean(v));
    setApproveVal(v);
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
                  loading={pendding1}
                  onClick={handleVeStake}
                >
                  veQDay质押
                </Button>
              ) : (
                <Button
                  type="primary"
                  loading={pendding5}
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
                loading={pendding2}
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
              <Button
                type="primary"
                loading={pendding6}
                onClick={handleUnStake}
              >
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
                loading={pendding4}
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
