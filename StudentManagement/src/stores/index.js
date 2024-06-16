import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getStudentsAction, getUserAction } from "./auth";
import { announcementReducer, getAnnouncementAction } from "./announcement";
import { classReducer, getClassAction } from "./class";

// function* rootSaga() {
//   yield all([authSaga(), clasSaga(), announcementSaga()]);
// }

// const sagaMiddleware = createSagaMiddleware();

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     announcement: announcementReducer,
//     class: classReducer,
//   },
//   devTools: import.meta.env.VITE_NODE_ENV === "development",

//   middleware: (getMiddleware) =>
//     getMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootSaga);

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
store.dispatch(getAnnouncementAction);
store.dispatch(getClassAction);
