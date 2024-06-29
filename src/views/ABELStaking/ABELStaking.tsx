import { useState } from "react";
import logo from "../../assets/abel/logo.svg";
import wel from "../../assets/abel/welcome.svg";
import CardBG from "./CardBG";
import ProtlifolioCard from "./ProtlifolioCard";
import StakingCard from "./StakingCard";
import StakingTable from "./StakingTable";
export default function ABELStaking() {
  const [loadingTable, setLaoding] = useState(false);
  return (
    <div className="page-abelstaking">
      <div className="flex">
        <div>
          <img src={logo} className="h-100px" alt="" />
        </div>
        <div className="flex flex-col justify-between py-10px ml-32px">
          <div className="font-size-18px">Staking ABEL, Earn QDAY</div>
          <div className="flex">
            <img src={wel} className="h-50px" alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-60px">
        <CardBG>
          <ProtlifolioCard />
        </CardBG>
        <CardBG>
          <StakingCard />
        </CardBG>
      </div>
      <div>
        <StakingTable
          dataSource={[1, 2, 3, 4, 5, 6, 7, 8]}
          loading={loadingTable}
        />
      </div>
    </div>
  );
}
