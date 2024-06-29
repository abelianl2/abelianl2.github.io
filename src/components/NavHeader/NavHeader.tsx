import { Button } from "antd";
export default function NavHeader() {
  const HEADER_MENUS = [
    {
      path: "",
      label: "Main",
    },
    {
      path: "",
      label: "Staking",
    },
    {
      path: "",
      label: "Description",
    },
    {
      path: "",
      label: "History",
    },
  ];
  return (
    <div className="flex bg-#141E2A h-72px justify-between items-center">
      <div className="flex px-20px">
        {HEADER_MENUS.map((item) => (
          <div className="px-20px cursor-pointer" key={item.label}>
            {item.label}
          </div>
        ))}
      </div>
      <div className="flex items-center font-size-24px pr-40px">
        <i className="i-material-symbols-help-outline cursor-pointer"></i>
        <div className="w-0 border-r-1px border-r-solid border-r-#94A3B8 h-24px mx-20px"></div>
        <i className="i-ic-outline-notifications-none  cursor-pointer"></i>
        <div className="w-0 border-r-1px border-r-solid border-r-#94A3B8 h-24px  mx-20px"></div>
        <Button type="primary">Connect</Button>
        <div className="w-0 border-r-1px border-r-solid border-r-#94A3B8 h-24px  mx-20px"></div>
        <i className="i-ph-globe-simple  cursor-pointer"></i>
      </div>
    </div>
  );
}
