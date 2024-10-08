import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlices/authReducer";

export const store = () =>{
    return configureStore({
        reducer:{
            // auth: AuthReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]