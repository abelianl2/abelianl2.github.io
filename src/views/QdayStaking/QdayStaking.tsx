import CardBG from "./CardBG";
import ToStakeCard from "./ToStakeCard";
import TotalCard from "./TotalCard";
import VeQDayCard from "./VeQDayCard";
import WabelCard from "./WabelCard";

export default function QdayStaking() {
  return (
    <div className="page-abelstaking">
      <div className="flex flex-col gap-14px">
        <CardBG>
          <TotalCard />
        </CardBG>
        <div className="mt-30px">
          <ToStakeCard />
        </div>
        <CardBG>
          <VeQDayCard />
        </CardBG>
        <div className="mt-30px">
          <WabelCard />
        </div>
      </div>
    </div>
  );
}
