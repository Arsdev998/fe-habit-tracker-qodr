import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../AxiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { name: string , password: string }) => {
    try {
      const response = await axiosInstance.post("/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
