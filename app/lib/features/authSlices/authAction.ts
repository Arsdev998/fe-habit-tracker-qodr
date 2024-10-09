import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";


export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { name: string , password: string },{rejectWithValue}) => {
    try {
      const response = await axiosInstance.post("/auth/login",
        credentials
      );
      return response.data;
    } catch (err:any) {
      if(!err?.response){
        throw err
      }
      console.log(err?.response?.data?.message);
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
