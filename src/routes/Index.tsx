/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LazyLoad from "./LazyLoad.tsx";
const Dashboard = lazy(() => import("../views/Dashboard/Dashboard.tsx"));
const QdayBridge = lazy(() => import("../views/QdayBridge/QdayBridge.tsx"));
const QdaySwap = lazy(() => import("../views/QdaySwap/QdaySwap.tsx"));
const QdayStaking = lazy(() => import("../views/ABELStaking/ABELStaking.tsx"));
const QdayLend = lazy(() => import("../views/QdayLend/QdayLend.tsx"));
const ABELStaking = lazy(() => import("../views/QdayStaking/QdayStaking.tsx"));
const Deposit = lazy(() => import("../views/Deposit/Deposit.tsx"));

const Error = lazy(() => import("../views/Error/Error.tsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/Dashboard",
        element: LazyLoad(Dashboard),
      },
      {
        path: "/QdayBridge",
        element: LazyLoad(QdayBridge),
      },
      {
        path: "/QdaySwap",
        element: LazyLoad(QdaySwap),
      },
      {
        path: "/QdayStaking",
        element: LazyLoad(QdayStaking),
      },
      {
        path: "/QdayLend",
        element: LazyLoad(QdayLend),
      },
      {
        path: "/ABELStaking",
        element: LazyLoad(ABELStaking),
      },
      {
        path: "/Deposit",
        element: LazyLoad(Deposit),
      },
    ],
  },
]);

export default router;
