import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    authSlice: authSlice, 
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});
