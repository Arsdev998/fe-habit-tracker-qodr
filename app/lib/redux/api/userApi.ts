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
    postUser: builder.mutation({
      query: ({
        name,
        email,
        password,
        fullname,
        joinDate,
        role,
      }: {
        name: string;
        email: string;
        password: string;
        fullname: string;
        joinDate: string;
        role: string;
      }) => ({
        url: "/user/create",
        method: "POST",
        body: {
          name,
          password,
          email,
          fullname,
          joinDate,
          role,
        },
      }),
      invalidatesTags: ["User"], // Invalidasi cache saat data diubah
    }),
    deletedUser: builder.mutation({
      query: (userId: string) =>({
        url: `/user/delete/${userId}`,
        method: "DELETE",
      })
    })
  }),
});

export const { useGetAllUserQuery, useGetProfileQuery, usePostUserMutation , useDeletedUserMutation} =
  userApi;
