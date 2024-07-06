import { Table, TableColumnsType, Modal, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import success from "../../assets/success.svg";
import dayjs from "dayjs";
import { RPC_URL, getContractInstance } from "../../utils/web3Modal";
import { JsonRpcProvider, ethers, formatEther } from "ethers";
import wablABI from "../../assets/json/WAbl.json";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { wabelContract } from "../../const/enum";
export type RewardListItem = {
  amount: string;
  date: string;
};
export default function WabelCard() {
  // lockedDetail
  const { address, isConnected } = useWeb3ModalAccount();
  const provider = new JsonRpcProvider(RPC_URL);
  const contractWebl = useRef<ethers.Contract>();
  const [list, setList] = useState<Array<RewardListItem>>([]);
  const [show, setShow] = useState(false);
  const columns: TableColumnsType<RewardListItem> = [
    {
      title: "金额",
      align: "center",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "到期日期",
      align: "center",
      dataIndex: "date",
      key: "date",
    },
    // {
    //   title: "状态",
    //   align: "center",
    //   dataIndex: "status",
    //   key: "status",
    // },
    // {
    //   title: "操作",
    //   align: "center",
    //   dataIndex: "action",
    //   key: "action",
    //   render() {
    //     return (
    //       <div
    //         className="color-#65EC9B cursor-pointer"
    //         onClick={() => setShow(true)}
    //       >
    //         提现
    //       </div>
    //     );
    //   },
    // },
  ];
  // 获取列表数据
  const handleGetList = async () => {
    contractWebl.current = await getContractInstance(
      provider,
      wabelContract,
      wablABI.abi
    );
    const data = await contractWebl.current?.lockedDetail(address);
    console.log("dd", data);
    setList(
      data.map((item: [bigint, bigint]) => {
        console.log("item[0]", item[0]);
        const t = Number(item[0].toString()) * 1000;
        console.log("t", t);
        return {
          amount: formatEther(item[1]),
          date: dayjs(t).format("YYYY/MM/DD HH:mm:ss"),
        };
      })
    );
  };

  useEffect(() => {
    if (address && isConnected) {
      handleGetList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);
  return (
    <div>
      <Table dataSource={list} columns={columns} pagination={false}></Table>
      <Modal
        open={show}
        title="Transaction detail"
        onCancel={() => setShow(false)}
        footer={[
          <>
            <div className="flex justify-center items-center">
              {" "}
              <Button type="primary">Unstake</Button>
            </div>
            <div className="text-center font-size-12px color-#334155 pb-14px mt-10px">
              Unstaking ABEL is coming soon.
            </div>
          </>,
        ]}
      >
        <div className="text-center color-#94A3B8">Amount</div>
        <div className="font-size-30px text-center">
          +0.00114612 <span className="font-size-16px">QDAY</span>
        </div>
        <div className="color-#65EC9B font-size-16px flex justify-center items-center mt-10px">
          <img src={success} className="h-18px mr-8px" alt="" /> Completed
        </div>
        <div className="bg-#1D2E40 rounded-8px p-12px mt-20px font-size-14px flex flex-col justify-between">
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">Staked At</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">Amount</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">Lock Period</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">Unlock At</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">ABEL TxID</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">QDAY TxID</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">From ABEL Address</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between items-center h-36px">
            <div className="color-#94A3B8">To QDAY Addres</div>
            <div>8,620.1258</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
