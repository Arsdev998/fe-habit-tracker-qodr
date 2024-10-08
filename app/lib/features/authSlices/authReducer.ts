import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    user: null,
    loading: false,
    error: null,
  },
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
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default authSlice;