import { useLocation, useNavigate } from "react-router-dom";
import icon0 from "../../assets/nav/0.svg";
import icon1 from "../../assets/nav/1.svg";
import icon2 from "../../assets/nav/2.svg";
import icon3 from "../../assets/nav/3.svg";
import icon4 from "../../assets/nav/4.svg";
import icon5 from "../../assets/nav/5.svg";
import iconA0 from "../../assets/nav/0-active.svg";
import iconA1 from "../../assets/nav/1-active.svg";
import iconA2 from "../../assets/nav/2-active.svg";
import iconA3 from "../../assets/nav/3-active.svg";
import iconA4 from "../../assets/nav/4-active.svg";
import iconA5 from "../../assets/nav/5-active.svg";
import logo from "../../assets/logo.svg";
import logoText from "../../assets/logo-text.svg";
import m1 from "../../assets/nav/m1.svg";
import m2 from "../../assets/nav/m2.svg";
export default function Navs() {
  const location = useLocation();
  const MENU_LIST = [
    {
      path: "/Dashboard",
      label: "Dashboard",
      icon: icon0,
      aIcon: iconA0,
    },
    {
      path: "/QdayBridge",
      label: "QdayBridge",
      icon: icon1,
      aIcon: iconA1,
    },
    {
      path: "/QdaySwap",
      label: "QdaySwap",
      icon: icon2,
      aIcon: iconA2,
    },
    {
      path: "/QdayStaking",
      label: "QdayStaking",
      icon: icon3,
      aIcon: iconA3,
    },
    {
      path: "/QdayLend",
      label: "QdayLend",
      icon: icon4,
      aIcon: iconA4,
    },
    {
      path: "/ABELStaking",
      label: "ABEL Staking",
      icon: icon5,
      aIcon: iconA5,
    },
  ];
  const navigator = useNavigate();
  return (
    <div className="h-100vh bg-#121E2A w-256px border-r-1px border-r-solid border-r-#334155">
      <div className="flex items-center px-40px h-80px border-b-solid border-b-1px border-b-#334155">
        <img src={logo} alt="" />
        <img src={logoText} alt="" />
      </div>
      <div className="h-60px border-b-solid border-b-1px border-b-#334155 flex items-center justify-center gap-20px px-20px">
        <div className="flex items-center">
          <img src={m1} className="mr-8px" alt="" /> 0.3856
        </div>
        <div className="flex items-center">
          <img src={m2} className="mr-8px" alt="" /> 0.3856
        </div>
      </div>
      <div className="py-10px">
        {MENU_LIST.map((item) => (
          <div
            onClick={() => navigator(item.path)}
            key={item.label}
            className={`h-64px flex justify-start items-center font-size-16px pl-50px cursor-pointer ${
              location.pathname === item.path
                ? "color-#146AFF font-bold"
                : "color-#94A3B8"
            }`}
          >
            <img
              src={location.pathname === item.path ? item.aIcon : item.icon}
              className="h-20px mr-14px"
              alt=""
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
