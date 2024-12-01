import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlices/authReducer";
import notificationReducer from './features/notifSlice';
import { habitApi } from "./api/habitApi";
import { userApi } from "./api/userApi";
import { murajaahApi } from "./api/murajaahApi";
import { myquranApi } from "./api/myquranApi";
import { unsplashApi } from "./api/unsplashApi";
import { ziyadahApi } from "./api/ziyadahApi";
import { tilawahApi } from "./api/tilawahApi";
import { notificationApi } from "./api/notificationApi";
import { monthApi } from "./api/monthAPi";
import { evaluationApi } from "./api/evaluationApi";
import { evaluationGeneralApi } from "./api/evaluationGeneralApi";
import { admindashboardApi } from "./api/admindashboardApi";
import { jurnalApi } from "./api/jurnalApi";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer, 
      notification: notificationReducer,
      [habitApi.reducerPath]: habitApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [murajaahApi.reducerPath]: murajaahApi.reducer,
      [ziyadahApi.reducerPath]: ziyadahApi.reducer,
      [tilawahApi.reducerPath]: tilawahApi.reducer,
      [jurnalApi.reducerPath]: jurnalApi.reducer,
      [notificationApi.reducerPath]: notificationApi.reducer,
      [monthApi.reducerPath]: monthApi.reducer,
      [evaluationApi.reducerPath]: evaluationApi.reducer,
      [evaluationGeneralApi.reducerPath]: evaluationGeneralApi.reducer,
      [admindashboardApi.reducerPath]: admindashboardApi.reducer,
      [myquranApi.reducerPath]: myquranApi.reducer,
      [unsplashApi.reducerPath]: unsplashApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        habitApi.middleware,
        userApi.middleware,
        murajaahApi.middleware,
        ziyadahApi.middleware,
        tilawahApi.middleware,
        jurnalApi.middleware,
        notificationApi.middleware,
        monthApi.middleware,
        evaluationApi.middleware,
        evaluationGeneralApi.middleware,
        admindashboardApi.middleware,
        myquranApi.middleware,
        unsplashApi.middleware,
      ]);
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
