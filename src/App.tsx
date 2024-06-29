import { Outlet } from "react-router-dom";
import "./App.css";
import Navs from "./components/Navs/Navs";
import NavHeader from "./components/NavHeader/NavHeader";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
