import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlices/authReducer";
import { habitApi } from "./api/habitApi";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // tambahkan reducer Anda di sini
      [habitApi.reducerPath]: habitApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(habitApi.middleware);
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
