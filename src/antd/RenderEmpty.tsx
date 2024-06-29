import { Empty } from "antd";
import empty from "../assets/empty/empty.svg";
export default function RenderEmpty() {
  return (
    <div>
      <Empty image={empty} />;
    </div>
  );
}
