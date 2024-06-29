import { configureStore } from "@reduxjs/toolkit";
import loginStore from "./modules/loginSlice";
export const store = configureStore({
  reducer: {
    loginStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
