import { Input, Button, message } from "antd";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { qdayContract, veContract } from "../../utils/web3Modal";
import QDayABI from "../../assets/json/QdayCore.json";
import VeQDayABI from "../../assets/json/VeQday.json";
import { ethers, parseEther } from "ethers";
import { useEffect, useState } from "react";
import { eventBus } from "../../events/events";

export default function VeQDayCard() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [messageApi, MessageContext] = message.useMessage();
  const { data: hash, writeContract: writeVeQdayContract } = useWriteContract();
  const { data: hash2, writeContract: writeQdayContract } = useWriteContract();
  const { data: hash4, writeContract: writeDepositContract } =
    useWriteContract();
  const { data: hash5, writeContract: writeArrroveContract } =
    useWriteContract();
  const { data: hash6, writeContract: writeUnstakeContract } =
    useWriteContract();
  const { status, data } = useWaitForTransactionReceipt({ hash });
  const { status: status2, data: data2 } = useWaitForTransactionReceipt({
    hash: hash2,
  });
  const { status: status4, data: data4 } = useWaitForTransactionReceipt({
    hash: hash4,
  });
  const { status: status5, data: data5 } = useWaitForTransactionReceipt({
    hash: hash5,
  });
  const { status: status6, data: data6 } = useWaitForTransactionReceipt({
    hash: hash6,
  });
  const [val, setVal] = useState("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const handleVeStake = () => {
    // VEQday 质押
    writeVeQdayContract({
      address: qdayContract,
      abi: QDayABI.abi,
      functionName: "stake",
      args: [parseEther(val)],
    });
  };
  // 兑换 VeQday
  const handleDesposit = () => {
    writeDepositContract({
      address: veContract,
      abi: VeQDayABI.abi,
      functionName: "deposit",
      value: parseEther(val3),
    });
  };
  // 质押Qday
  const handleQdayStake = () => {
    writeQdayContract({
      address: qdayContract,
      abi: QDayABI.abi,
      functionName: "stakeWithQday",
      value: parseEther(val1),
    });
  };
  // VEQday解除质押
  const handleUnStake = () => {
    writeUnstakeContract({
      address: qdayContract,
      abi: QDayABI.abi,
      functionName: "unstake",
      args: [parseEther(val2)],
    });
  };

  // 授权合约
  const handleApprove = () => {
    writeArrroveContract({
      address: veContract,
      abi: VeQDayABI.abi,
      functionName: "approve",
      args: [qdayContract, ethers.MaxUint256],
    });
  };
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
    if (status) {
      if (status === "success" || data?.status) {
        messageApi.success("交易成功");
        eventBus.emit("updateEvent");
      }
      if (status === "error" && !data?.status) {
        messageApi.success("交易失败");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, status, data]);

  useEffect(() => {
    if (data2) {
      setLoading2(false);
    }
    if (status2) {
      if (status2 === "success" || data2?.status) {
        messageApi.success("质押成功");
        eventBus.emit("updateEvent");
      }
      if (status2 === "error" && !data2?.status) {
        messageApi.success("质押失败");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash2, status2, data2]);

  useEffect(() => {
    if (data4) {
      setLoading4(false);
    }
    if (status4) {
      if (status4 === "success" || data4?.status) {
        messageApi.success("交易成功");
        eventBus.emit("updateEvent");
      }
      if (status4 === "error" && !data4?.status) {
        messageApi.success("交易失败");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash2, status2, data2]);
  useEffect(() => {
    if (data5) {
      setLoading5(false);
    }
    if (status5) {
      if (status5 === "success" || data5?.status) {
        messageApi.success("交易成功");
        eventBus.emit("updateEvent");
      }
      if (status4 === "error" && !data5?.status) {
        messageApi.success("交易失败");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash5, status5, data5]);
  useEffect(() => {
    if (data6) {
      setLoading6(false);
    }
    if (status6) {
      if (status6 === "success" || data6?.status) {
        messageApi.success("交易成功");
        eventBus.emit("updateEvent");
      }
      if (status6 === "error" && !data6?.status) {
        messageApi.success("交易失败");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash6, status6, data6]);
  return (
    <div>
      <div className="flex justify-between h-200px">
        {MessageContext}
        <div className="w-50% h-80% flex flex-col justify-between  px-10px">
          <div className="flex items-center justify-between">
            <div>
              <Input
                value={val}
                type="number"
                onChange={(e) => setVal(e.target.value)}
                placeholder="请输入待质押veQDay数量"
              />
            </div>
            <div>
              <Button type="primary" loading={loading} onClick={handleVeStake}>
                veQDay质押
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
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
        <div className="w-50% h-80% flex flex-col justify-between  px-10px">
          <div className="flex items-center justify-between">
            <div>
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
            <div>
              <Input
                value={val3}
                type="number"
                onChange={(e) => setVal3(e.target.value)}
                placeholder="请输入待质押QDay数量"
              />
            </div>
            <div>
              <Button
                type="primary"
                loading={loading4}
                onClick={handleDesposit}
              >
                兑换 VeQday
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button type="primary" loading={loading6} onClick={handleApprove}>
          Approve
        </Button>
      </div>
    </div>
  );
}
