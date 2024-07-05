import CardBG from "./CardBG";
// import ToStakeCard from "./ToStakeCard";
import TotalCard from "./TotalCard";
import VeQDayCard from "./VeQDayCard";
import WabelCard from "./WabelCard";

export default function QdayStaking() {
  return (
    <div className="page-abelstaking">
      <div className="flex flex-col gap-24px">
        <CardBG title="汇总">
          <TotalCard />
        </CardBG>
        {/* <div className="mt-30px">
          <ToStakeCard />
        </div> */}
        <CardBG title="VeQDay">
          <VeQDayCard />
        </CardBG>
        <CardBG title="WAbel">
          <WabelCard />
        </CardBG>
      </div>
    </div>
  );
}
