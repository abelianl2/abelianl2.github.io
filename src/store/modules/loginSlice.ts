import { createSlice } from "@reduxjs/toolkit";
export const LOCALUSERINFOKEY = "userInfo";
const userInfo = localStorage.getItem(LOCALUSERINFOKEY);
const defaultVal = {
  jwt_token: "",
  user_id: "",
};
const defaultDetail = {
  user_id: "",
  email: "",
  invite_code: "",
  wallet_address: "",
};
const parseInfo = userInfo ? JSON.parse(userInfo) : defaultVal;

// export const getUserDetail = createAsyncThunk("getUserDetail", async () => {
//   const res = await get_user_detail();
//   return res.data;
// });

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "",
    userInfo: parseInfo,
    userDetail: defaultDetail,
    isLogin: parseInfo.jwt_token ? true : false,
  },
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload;
      if (!state.isLogin) {
        // log out
        localStorage.removeItem(LOCALUSERINFOKEY);
      }
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      if (action.payload && action.payload.jwt_token) {
        localStorage.setItem(LOCALUSERINFOKEY, JSON.stringify(action.payload));
      }
    },
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },
    setLogout(state) {
      state.userInfo = defaultVal;
      state.isLogin = false;
      localStorage.removeItem(LOCALUSERINFOKEY);
    },
  },
  //   extraReducers(builder) {
  //     builder
  //       .addCase(getUserDetail.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(getUserDetail.fulfilled, (state, action) => {
  //         state.userDetail = action.payload;
  //         state.status = "succeeded";
  //       });
  //   },
});

export const { setLogin, setUserInfo, setLogout, setUserDetail } =
  loginSlice.actions;

export default loginSlice.reducer;
