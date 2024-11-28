import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUserType, UserType } from "../../types";

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
      query: (body: CreateUserType) => ({
        url: "/user/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ body, userId }: { body: UserType; userId: string }) => ({
        url: `/user/update/${userId}`,
        method: "PATCH",
        body: {
          body,
        },
      }),
      invalidatesTags: ["User"],
    }),
    updatePasswordUser: builder.mutation({
      query: ({
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
      }: {
        userId: string;
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
      }) => ({
        url: `/user/updatePassword/${userId}`,
        method: "PATCH",
        body: {
          oldPassword,
          newPassword,
          confirmPassword,
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
