import { Input, Button, message } from "antd";
import { JsonRpcProvider, parseEther } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import qdayCoreABI from "../../assets/json/QdayCore.json";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import RewardTable from "./RewardTable";
import { eventBus } from "../../events/events";
import { coreContract, RPC_URL } from "../../const/enum";

export default function ToStakeCard() {
  const [stakeVal, setStake] = useState("");
  const provider = new JsonRpcProvider(RPC_URL);
  const [messageApi, MessageContext] = message.useMessage();
  // const provider = new JsonRpcProvider(RPC_URL);
  const [loading, setLoading] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const { data: hash, writeContract } = useWriteContract();
  const handleStake = async () => {
    if (!stakeVal) {
      messageApi.warning("Enter the stake amount");
      return;
    }
    if (!provider) {
      messageApi.warning(
        "The contract instance is being initialized, please wait"
      );
      return;
    }

    if (walletProvider) {
      setLoading(true);
      writeContract({
        address: coreContract,
        abi: qdayCoreABI.abi,
        functionName: "stakeWithQday",
        value: parseEther(stakeVal),
      });
    }
  };

  const { status, data } = useWaitForTransactionReceipt({ hash });

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
  return (
    <>
      {MessageContext}
      <div className="min-h-340px">
        <div className="flex justify-start items-center gap-20px">
          <div>
            <Input
              type="number"
              value={stakeVal}
              placeholder="Enter the stake amount"
              onChange={(e) => setStake(e.target.value.toString())}
            />
          </div>
          <div>
            <Button type="primary" loading={loading} onClick={handleStake}>
              {loading ? "Staking..." : "Submit"}
            </Button>
          </div>
        </div>
        <div className="mt-20px">
          <RewardTable />
        </div>
      </div>
    </>
  );
}
