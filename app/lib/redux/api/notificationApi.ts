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
    getNotification: builder.query({
      query: ({ userId }: { userId: string }) => `/notifications/${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: Notification) => ({
                type: "Notification",
                id,
              })), // Tag berdasarkan ID notifikasi
              { type: "Notification", id: "LIST" }, // Tag untuk daftar notifikasi
            ]
          : [{ type: "Notification", id: "LIST" }],
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
      query:({userId}:{userId:string})=>({
        url:`/notifications/deletemany/${userId}`,
        method:'DELETE'
      }),
      invalidatesTags:[{type:"Notification",id:"LIST"}]
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetUnreadNotificationQuery,
  usePostNotificationMutation,
  useMarkAllNotificationsMutation,
  useDeleteNotificationsMutation,
  useDeleteManyNotificationMutation
} = notificationApi;
