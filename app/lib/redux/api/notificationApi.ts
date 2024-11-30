import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Notification = {
  id: string;
  message: string;
  status: boolean;
  createdAt?: Date;
};

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  tagTypes: ["Notification"], // Pastikan tagTypes sesuai dengan endpoint yang digunakan
  endpoints: (builder) => ({
    postNotification: builder.mutation({
      query: ({ userId, message }: { userId: string; message: string }) => ({
        url: `/notifications/post/${userId}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: [
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD" },
      ],
    }),
    postNotificationToAllUser: builder.mutation({
      query: ({ message }: { message: string }) => ({
        url: `/notifications/sendAll/sendToAllUsers`,
        method: "POST",
        body: { message },
      }),
    }),
    getNotification: builder.query({
      query: ({ page,limit }: { page: string, limit: string }) => `/notifications/get/all?page=${page}&limit=${limit}`,
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),
    getUnreadNotification: builder.query({
      query: ({ userId }: { userId: string }) =>
        `/notifications/${userId}/unread`,
      providesTags: [{ type: "Notification", id: "UNREAD" }],
    }),
    markAllNotifications: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `/notifications/markreadmany/${userId}`,
        method: "PATCH",
      }),
      // Invalidasi query setelah mutasi berhasil
      invalidatesTags: [
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD" },
      ],
    }),
    deleteNotifications: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `/notifications/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
    deleteManyNotification: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `/notifications/deletemany/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetUnreadNotificationQuery,
  usePostNotificationMutation,
  usePostNotificationToAllUserMutation,
  useMarkAllNotificationsMutation,
  useDeleteNotificationsMutation,
  useDeleteManyNotificationMutation,
} = notificationApi;
