import { createSlice } from "@reduxjs/toolkit";
import { getStatus, login, logout } from "./authAction";

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
        state.user = action.payload.user;
        state.loading = false;
        state.error  = null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getStatus.pending, (state) => {
        state.status = "idle";
        state.loading = false;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(getStatus.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = "idle";
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.status = "logout";
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default authReducer.reducer;
