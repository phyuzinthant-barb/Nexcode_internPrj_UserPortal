import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialToken = Cookies.get("token") || null;
const username = Cookies.get("username") || null;

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    email: null,
    token: initialToken,
    username,
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log('setCredentials Action:', action);
      const { email, token, username, isFirstTime } = action.payload;
      state.email = email;
      state.token = token;
      state.username = username;
      state.isFirstTime = isFirstTime;
      Cookies.set("token", token, { expires: 1 }); 
      Cookies.set("username", username);
      Cookies.set("isFirstTime", isFirstTime);
    },

    logoutAccount: (state, action) => {
      state.email = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("username");
    },
  },
});

export const { setCredentials, logoutAccount } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentEmail = (state) => state.authSlice.email;
export const selectCurrentToken = (state) => state.authSlice.token;
