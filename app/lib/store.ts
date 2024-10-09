import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlices/authReducer";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // tambahkan reducer Anda di sini
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
