import { Table, TableColumnsType, Modal, Button } from "antd";
import { useState } from "react";
import success from "../../assets/success.svg";

export type RewardListItem = {
  amount: string;
  date: string;
  status: string;
};
export default function RewardTable() {
  const [list] = useState([]);
  const [show, setShow] = useState(false);
  const columns: TableColumnsType<RewardListItem> = [
    {
      title: "质押金额",
      align: "center",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "提现日期",
      align: "center",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "状态",
      align: "center",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "action",
      key: "action",
      render() {
        // return <div className="color-#65EC9B cursor-pointer">Completed</div>;
        // return <div className="color-#FE675D cursor-pointer">Failed</div>;
        //  <div
        //     className="color-#FFD400 cursor-pointer"
        //     onClick={() => setShow(true)}
        //   >
        //     Pending
        //   </div>
        return (
          <div
            className="color-#65EC9B cursor-pointer"
            onClick={() => setShow(true)}
          >
            Completed
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={list} columns={columns}></Table>
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
