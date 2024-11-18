import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../AxiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      window.location.href = "/";
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
      return response.data;
    } catch (err: any) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
