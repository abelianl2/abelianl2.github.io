import { Table, TableProps, type TableColumnsType, Modal, Button } from "antd";
import { useState } from "react";
import success from "../../assets/success.svg";
interface StakerTableProps {
  dataSource: Array<any>;
  sorter?: (order: string) => void;
  loading: boolean;
}

export default function StakingTable(props: StakerTableProps) {
  const [show, setShow] = useState(false);
  const onChange: TableProps<any>["onChange"] = () => {};
  const columns: TableColumnsType<any> = [
    {
      title: "Staker Address",
      align: "center",
    },
    {
      title: "Amount",
      align: "center",
    },
    {
      title: () => {
        return (
          <div className="flex items-center">
            Lock Period{" "}
            <i className="i-material-symbols-help-outline ml-8px font-size-20px"></i>
          </div>
        );
      },
      align: "center",
      key: "amount",
    },
    {
      title: "Unlock At",
      align: "center",
    },
    {
      title: "ABEL TxID ",
      align: "center",
    },
    {
      title: "QDAY TxID ",
      align: "center",
    },
    {
      title: "From ABEL Addr. ",
      align: "center",
    },
    {
      title: "To QDAY Addr. ",
      align: "center",
    },
    {
      title: "Status ",
      align: "center",
      sorter: {
        multiple: undefined,
      },
      render(row) {
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
    <>
      <div className="w-100% staker-table h-100%  overflow-x-scroll scrollbar-x">
        <div className="mt-40px font-size-16px mb-5px">Deposit History</div>
        <Table
          columns={columns}
          dataSource={props.dataSource}
          pagination={false}
          onChange={onChange}
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
