import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../AxiosInstance";
import { removeAuthTokens, setAuthToken } from "@/app/utils/auth";

export const login = createAsyncThunk(
  "auth/login",
  async (
    loginData: { name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      const authToken = response.headers["authorization"]?.split("Bearer ")[1];
      if (authToken) {
        setAuthToken(authToken);
      }
      return response.data;
    } catch (err: any) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const getStatus = createAsyncThunk(
  "auth/getStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/status");
      return response.data;
    } catch (err: any) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      removeAuthTokens();
      return response.data;
    } catch (err: any) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
