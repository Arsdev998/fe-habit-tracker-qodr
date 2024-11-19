import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../AxiosInstance";

// export const login = createAsyncThunk(
//   "auth/login",
//   async (
//     credentials: { name: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.post("/auth/login", credentials);
//       return response.data.user;
//     } catch (err: any) {
//       if (!err?.response) {
//         throw err;
//       }
//       return rejectWithValue(err?.response?.data?.message);
//     }
//   }
// );

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      // Jika response tidak ok, throw error
      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }
      // Cek role jika diperlukan
      return data.user;
    } catch (err: any) {
      console.error("Login error:", err);
      return rejectWithValue(err.message || "Login failed");
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
