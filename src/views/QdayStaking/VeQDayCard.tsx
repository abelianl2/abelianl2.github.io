import { Input, Button } from "antd";

export default function VeQDayCard() {
  return (
    <div className="flex justify-between h-160px">
      <div className="w-50% h-100% flex flex-col justify-between  px-10px">
        <div className="flex items-center justify-between">
          <div>
            <Input placeholder="请输入待质押veQDay数量" />
          </div>
          <div>
            <Button type="primary">veQDay质押</Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Input placeholder="请输入待质押QDay数量" />
          </div>
          <div>
            <Button type="primary">QDay质押</Button>
          </div>
        </div>
      </div>
      <div className="w-50% h-100% flex justify-between items-start px-10px">
        <div className="flex items-center justify-between w-100%">
          <div>
            <Input placeholder="请输入解除质押的数量" />
          </div>
          <div>
            <Button type="primary">解除质押</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
