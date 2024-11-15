import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUser : builder.query<any,void>({
      query:() => '/user/getAll'
    }),
    getProfile: builder.query<any, string>({
      query: (userId: string) => `/user/getById/${userId}`,
    }),
  }),
});

export const { useGetAllUserQuery,useGetProfileQuery } = userApi;
