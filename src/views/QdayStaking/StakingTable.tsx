import { Table, type TableColumnsType, Modal, Button, message } from "antd";
import { useState } from "react";
import success from "../../assets/success.svg";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { UserStakeItem } from "./type";
interface StakerTableProps {
  dataSource: Array<UserStakeItem>;
  sorter?: (order: string) => void;
  loading: boolean;
}

export default function StakingTable(props: StakerTableProps) {
  const [show, setShow] = useState(false);
  const [, messageContext] = message.useMessage();
  // const onChange: TableProps<any>["onChange"] = () => {};
  // const handleCopy = () => {
  //   messageApi.success("Copied to clipboard");
  // };

  const columns: TableColumnsType<UserStakeItem> = [
    {
      title: "Stake Amount",
      align: "center",
      dataIndex: "amount",
      key: "amount",
    },
    // {
    //   title: "Amount",
    //   align: "center",
    //   key: "2",
    // },
    // {
    //   title: () => {
    //     return (
    //       <div className="flex items-center">
    //         Lock Period{" "}
    //         <Popover content="day">
    //           <i className="i-material-symbols-help-outline ml-8px font-size-20px"></i>
    //         </Popover>
    //       </div>
    //     );
    //   },
    //   align: "center",
    //   key: "amount",
    // },
    // {
    //   title: "Unlock At",
    //   align: "center",
    //   key: "4",
    // },
    // {
    //   title: "ABEL TxID ",
    //   align: "center",
    //   key: "5",

    //   render(row) {
    //     return (
    //       <div>
    //         <CopyToClipboard text="1" onCopy={handleCopy}>
    //           <i className="i-octicon-copy-24 font-size-20px cursor-pointer"></i>
    //         </CopyToClipboard>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "QDAY TxID ",
    //   align: "center",
    //   key: "6",

    //   render(row) {
    //     return (
    //       <div>
    //         <CopyToClipboard text="2" onCopy={handleCopy}>
    //           <i className="i-octicon-copy-24 font-size-20px  cursor-pointer"></i>
    //         </CopyToClipboard>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "From ABEL Addr. ",
    //   align: "center",
    //   key: "7",
    //   render(row) {
    //     return (
    //       <div>
    //         <CopyToClipboard text="3" onCopy={handleCopy}>
    //           <i className="i-octicon-copy-24 font-size-20px  cursor-pointer"></i>
    //         </CopyToClipboard>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "To QDAY Addr. ",
    //   align: "center",
    //   key: "8",

    //   render(row) {
    //     return (
    //       <div>
    //         <CopyToClipboard text="4" onCopy={handleCopy}>
    //           <i className="i-octicon-copy-24 font-size-20px  cursor-pointer"></i>
    //         </CopyToClipboard>{" "}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Status ",
    //   align: "center",
    //   key: "9",
    //   sorter: {
    //     multiple: undefined,
    //   },
    //   render(row) {
    //     // return <div className="color-#65EC9B cursor-pointer">Completed</div>;
    //     // return <div className="color-#FE675D cursor-pointer">Failed</div>;
    //     //  <div
    //     //     className="color-#FFD400 cursor-pointer"
    //     //     onClick={() => setShow(true)}
    //     //   >
    //     //     Pending
    //     //   </div>
    //     return (
    //       <div
    //         className="color-#65EC9B cursor-pointer"
    //         onClick={() => setShow(true)}
    //       >
    //         Completed
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <>
      {messageContext}
      <div className="w-100% staker-table h-100%  overflow-x-scroll scrollbar-x">
        <div className="mt-40px font-size-16px mb-5px">Deposit History</div>
        <Table
          columns={columns}
          dataSource={props.dataSource}
          pagination={false}
          // onChange={onChange}
          loading={props.loading}
        ></Table>
      </div>
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
    </>
  );
}
