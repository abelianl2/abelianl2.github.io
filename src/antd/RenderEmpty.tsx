import { Empty } from "antd";
import empty from "../assets/empty/empty.svg";
export default function RenderEmpty() {
  return (
    <div>
      <Empty
        image={
          <div className="flex items-end justify-center h-100%">
            <img src={empty} className="w-80px" alt="" />
          </div>
        }
      />
      ;
    </div>
  );
}
