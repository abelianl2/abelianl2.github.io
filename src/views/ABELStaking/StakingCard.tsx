import { Button, Modal, Popover } from "antd";
import coin from "../../assets/abel/coin.svg";
import { useState } from "react";
export default function StakingCard() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-between h-190px">
        <div className="flex justify-between color-white">
          <div>
            <div className="font-size-18px">Staking Reward</div>
            <div className="font-size-14px color-#94A3B8">
              Track balances of QDAY
            </div>
          </div>
          <div>
            <div className="w-188px flex justify-between bg-#1D2E40 rounded-6px p-8px h-70px">
              <div>
                <div className="font-size-14px color-#94A3B8">Claimable</div>
                <div className="flex items-center color-white font-size-20px">
                  0.00
                  <img src={coin} className="w-16px ml-5px" alt="" />
                </div>
              </div>
              <div>
                {" "}
                <Button
                  className="h-46px color-white font-size-16px"
                  onClick={() => setShow(true)}
                >
                  Stake
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="font-size-14px">
              APR{" "}
              <Popover content="Estimated ARR and APR in detail">
                <i className="i-material-symbols-help"></i>
              </Popover>
            </div>
            <div className="flex items-center color-white font-size-20px">
              0.00 <img src={coin} className="w-16px ml-5px" alt="" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-size-14px">
              Estimated earning{" "}
              <Popover content="Estimated QDAY earning in the next 24 hours">
                <i className="i-material-symbols-help"></i>
              </Popover>
            </div>
            <div className="flex items-center color-white font-size-20px">
              0.00 <img src={coin} className="w-16px ml-5px" alt="" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-size-14px">Unclaimed rewards</div>
            <div className="flex items-center color-white font-size-20px">
              0.00 <img src={coin} className="w-16px ml-5px" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Claim Rewards"
        open={show}
        onCancel={() => setShow(false)}
        footer={[
          <div className="flex justify-center pb-20px">
            <Button type="primary">Claim 8,620.1258 QDAY</Button>
          </div>,
        ]}
      >
        <div className="flex justify-center font-size-30px">
          21,566.2356 <img src={coin} alt="" className="ml-8px" />
        </div>
        <div className="text-center  font-size-16px color-#94A3B8 mt-8px">
          =$123456,78915.15
        </div>
        <div className="bg-#1D2E40 rounded-8px p-12px h-80px mt-20px font-size-14px flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="color-#94A3B8">Claimable:</div>
            <div>8,620.1258</div>
          </div>
          <div className="flex justify-between">
            <div className="color-#94A3B8">Claimable:</div>
            <div>8,620.1258</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
