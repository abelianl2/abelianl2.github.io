import { Outlet } from "react-router-dom";
import "./App.css";
import Navs from "./components/Navs/Navs";
import NavHeader from "./components/NavHeader/NavHeader";
import { Spin } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (window) {
      window.onload = () => {
        setLoading(false);
      };
    }
  }, []);
  return (
    <>
      <Spin spinning={loading}>
        <div className="page-wrapper w-100vw min-h-100vh">
          <div className="flex">
            <div>
              <Navs />
            </div>
            <div className="w-full text-left">
              <NavHeader />
              <div className="page-content py-30px px-40px scrollbar-y">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default App;
