import { Button, Popover } from "antd";
import { web3Modal } from "../../utils/web3Modal";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { addressDots } from "../../utils/utils";
import { useEffect } from "react";
import { eventBus } from "../../events/events";

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
  const { address, isConnected } = useWeb3ModalAccount();
  const handleConnect = async () => {
    await web3Modal.open();
  };
  const handleDisconnect = () => {
    web3Modal.disconnect();
  };

  useEffect(() => {
    eventBus.on("toLogin", handleConnect);
    return () => {
      eventBus.off("toLogin", handleConnect);
    };
  }, []);

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
        <i className="i-material-symbols-help-outline cursor-pointer font-size-20px"></i>
        <div className="w-0 border-r-1px border-r-solid border-r-#94A3B8 h-24px mx-20px"></div>
        <i className="i-ic-outline-notifications-none  cursor-pointer font-size-20px"></i>
        <div className="w-0 border-r-1px border-r-solid border-r-#94A3B8 h-24px  mx-20px"></div>
        {isConnected ? (
          <Popover
            content={
              <Button type="primary" onClick={handleDisconnect}>
                Disconnect
              </Button>
            }
          >
            <span className="font-size-16px color-#94A3B8 cursor-pointer">
              {addressDots(address || "", 5, 5)}
            </span>
          </Popover>
        ) : (
          <Button type="primary" onClick={handleConnect}>
            Connect
          </Button>
        )}

        <div className="w-0 border-r-1px border-r-solid border-r-#94A3B8 h-24px  mx-20px"></div>
        <i className="i-ph-globe-simple  cursor-pointer font-size-20px"></i>
      </div>
    </div>
  );
}
