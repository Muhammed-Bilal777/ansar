// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/user/userApiSlice";
import { UserInfoSlice } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    userInfo: UserInfoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
