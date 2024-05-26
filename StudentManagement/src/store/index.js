import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getUserAction } from "./auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV,
});

store.dispatch(getUserAction)