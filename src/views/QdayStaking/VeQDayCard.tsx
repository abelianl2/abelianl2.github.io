import { Input, Button, message } from "antd";
import { useWriteContract } from "wagmi";
import { RPC_URL, qdayContract } from "../../utils/web3Modal";
import QDayABI from "../../assets/json/QdayCore.json";
// import VeQDayABI from "../../assets/json/VeQday.json";
import { parseEther } from "ethers";
import { useEffect, useState } from "react";
import { eventBus } from "../../events/events";
import { JsonRpcProvider } from "ethers";

export default function VeQDayCard() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const provider = new JsonRpcProvider(RPC_URL);
  // const [, setLoading5] = useState(false);
  // const [loading6, setLoading6] = useState(false);
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
  // const { data: hash4, writeContract: writeDepositContract } =
  //   useWriteContract();
  // const { data: hash5, writeContract: writeArrroveContract } =
  //   useWriteContract();
  const {
    data: hash6,
    writeContract: writeUnstakeContract,
    error: unStakeErr,
  } = useWriteContract();

  const [val, setVal] = useState("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  // const [val3, setVal3] = useState("");
  const handleVeStake = () => {
    if (!val) {
      return;
    }
    setLoading(true);
    // VEQday 质押
    writeVeQdayContract({
      address: qdayContract,
      abi: QDayABI.abi,
      functionName: "stake",
      args: [parseEther(val)],
    });
  };
  // 兑换 VeQday
  // const handleDesposit = () => {
  //   writeDepositContract({
  //     address: veContract,
  //     abi: VeQDayABI.abi,
  //     functionName: "deposit",
  //     value: parseEther(val3),
  //   });
  // };
  // 质押Qday
  const handleQdayStake = () => {
    if (!val1) {
      return;
    }
    setLoading2(true);

    writeQdayContract({
      address: qdayContract,
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
      address: qdayContract,
      abi: QDayABI.abi,
      functionName: "unstake",
      args: [parseEther(val2)],
    });
  };
  const handleLoadReceipt = async (hash: string, type: string = "交易") => {
    messageApi.open({
      duration: 0,
      type: "loading",
      content: `${type}中请稍后...`,
    });
    const receipt = await provider.waitForTransaction(hash);
    messageApi.destroy();
    if (receipt?.status) {
      messageApi.success(`${type}成功`);
      eventBus.emit("updateEvent");
    } else {
      messageApi.error(`${type}失败`);
    }
  };
  // 授权合约
  // const handleApprove = () => {
  //   writeArrroveContract({
  //     address: veContract,
  //     abi: VeQDayABI.abi,
  //     functionName: "approve",
  //     args: [qdayContract, ethers.MaxUint256],
  //   });
  // };
  useEffect(() => {
    hash &&
      handleLoadReceipt(hash, "质押veQDay").finally(() => setLoading(false));
    hash2 &&
      handleLoadReceipt(hash2, "质押QDay").finally(() => setLoading2(false));
    hash6 &&
      handleLoadReceipt(hash6, "解除质押").finally(() => setLoading4(false));
    if (unStakeErr) {
      messageApi.error(unStakeErr.message);
      setLoading(false);
    }
    if (qDayErr) {
      messageApi.error(qDayErr.message);
      setLoading2(false);
    }
    if (veDayErr) {
      messageApi.error(veDayErr.message);
      setLoading4(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, hash2, hash6, unStakeErr, qDayErr, veDayErr]);

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
              <Button type="primary" loading={loading} onClick={handleVeStake}>
                veQDay质押
              </Button>
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
          {/* <div className="flex items-center justify-between">
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
          </div> */}
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
