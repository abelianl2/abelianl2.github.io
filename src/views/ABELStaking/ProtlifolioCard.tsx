import { Button } from "antd";
import coin from "../../assets/abel/coin.svg";
import { useNavigate } from "react-router-dom";
export default function ProtlifolioCard() {
  const navigator = useNavigate();
  const handleToStake = () => {
    navigator("/Deposit");
  };
  return (
    <div className="flex flex-col justify-between h-190px">
      <div className="flex justify-between color-white">
        <div>
          <div className="font-size-18px">Portfolio</div>
          <div className="font-size-14px color-#94A3B8">
            Track balances of wABEL
          </div>
        </div>
        <div>
          <Button className="h-46px" onClick={handleToStake}>
            Stake
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="font-size-14px">Staked wABEL</div>
          <div className="flex items-center color-white font-size-20px">
            0.00 <img src={coin} className="w-16px ml-5px" alt="" />
          </div>
        </div>
        <div className="flex-1">
          <div className="font-size-14px">Staked wABEL</div>
          <div className="flex items-center color-white font-size-20px">
            0.00 <img src={coin} className="w-16px ml-5px" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
