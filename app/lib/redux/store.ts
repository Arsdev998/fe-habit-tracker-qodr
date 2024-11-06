import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlices/authReducer";
import { habitApi } from "./api/habitApi";
import { userApi } from "./api/userApi";
import { murajaahApi } from "./api/murajaahApi";
import { myquranApi } from "./api/myquranApi";
import { unsplashApi } from "./api/unsplashApi";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // tambahkan reducer Anda di sini
      [habitApi.reducerPath]: habitApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [murajaahApi.reducerPath]: murajaahApi.reducer,
      [myquranApi.reducerPath]:myquranApi.reducer,
      [unsplashApi.reducerPath]: unsplashApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        habitApi.middleware,
        userApi.middleware,
        murajaahApi.middleware,
        myquranApi.middleware,
        unsplashApi.middleware
      ]);
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
