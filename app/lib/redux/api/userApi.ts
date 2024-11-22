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
    updateProfile: builder.mutation({
      query: ({userId,name,email,fullname,motivation,}: {userId: string;name: string;email: string;fullname: string;motivation: string;}) => ({
        url: `/user/update/${userId}`,
        method: "PATCH",
        body: {
          name,
          email,
          fullname,
          motivation,
        },
      }),
      invalidatesTags:["User"],
    }),
    updatePasswordUser: builder.mutation({
      query: ({userId,oldPassword,newPassword,confirmPassword}: {userId: string;oldPassword: string;newPassword: string;confirmPassword: string;}) => ({
        url: `/user/updatePassword/${userId}`,
        method: "PATCH",
        body: {
         oldPassword,
         newPassword,
         confirmPassword
        },
      }),
    }),
    deletedUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetProfileQuery,
  usePostUserMutation,
  useUpdateProfileMutation,
  useUpdatePasswordUserMutation,
  useDeletedUserMutation,
} = userApi;
