import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { Input, Button, message } from "antd";
import { JsonRpcApiProvider, ethers, formatUnits, parseEther } from "ethers";
import { MutableRefObject, useEffect, useState } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import qdayCoreABI from "../../assets/json/QdayCore.json";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { qdayContract } from "../../utils/web3Modal";
import RewardTable from "./RewardTable";
type ToStakeCardProps = {
  qdayCoreContract: MutableRefObject<ethers.Contract | undefined>;
};
export default function ToStakeCard(props: ToStakeCardProps) {
  const [stakeVal, setStake] = useState("");
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
    if (!props.qdayCoreContract.current) {
      messageApi.warning(
        "The contract instance is being initialized, please wait"
      );
      return;
    }
    if (walletProvider) {
      setLoading(true);
      try {
        console.log("wei", formatUnits(parseEther(stakeVal), "wei"));

        writeContract({
          address: qdayContract,
          abi: qdayCoreABI.abi,
          functionName: "stakeWithQday",
          value: formatUnits(parseEther(stakeVal), "wei"),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isError) {
      messageApi.error("交易失败");
    }
    if (isConfirmed) {
      messageApi.success("交易成功");
    }
    if (isConfirming) {
      messageApi.loading("交易正在进行中", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirming, isConfirmed, isError]);
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
