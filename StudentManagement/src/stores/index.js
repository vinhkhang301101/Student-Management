import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getStudentsAction, getUserAction } from "./auth";
import { announcementReducer, getAnnouncementAction } from "./announcement";
import { classReducer, getClassAction } from "./class";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    announcement: announcementReducer,
    class: classReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV,
});

store.dispatch(getUserAction);
store.dispatch(getStudentsAction);
