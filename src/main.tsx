import ReactDOM from "react-dom/client";
import "./styles/common.scss";
import "./index.css";
import "virtual:uno.css";
import "./styles/reset.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Index.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ConfigProvider } from "antd";
import { ANTD_THEME } from "./const/const.ts";
import RenderEmpty from "./antd/RenderEmpty.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi.ts";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={ANTD_THEME} renderEmpty={RenderEmpty}>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </ConfigProvider>
);
