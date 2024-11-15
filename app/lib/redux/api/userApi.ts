import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUser: builder.query<any, void>({
      query: () => "/user/getAll",
      providesTags: ["User"], // Tambahkan ini jika data di-cache
    }),
    getProfile: builder.query<any, string>({
      query: (userId: string) => `/user/getById/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    postUser: builder.mutation<any, UserType>({
      query: (body) => ({
        url: "/user/post",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // Invalidasi cache saat data diubah
    }),
  }),
});

export const { useGetAllUserQuery, useGetProfileQuery, usePostUserMutation } =
  userApi;
