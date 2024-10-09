import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authAction";
import { act } from "react";
import { string } from "zod";

interface AuthState {
  status: string;
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  status: "idle",
  user: null,
  loading: false,
  error: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state,action) => {
        state.status = "failed";
        state.error  = action.payload as string;
        state.loading = false;
      });
  },
});

export default authReducer.reducer;
