import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
  },
),
tagTypes: ["Notification"],
  endpoints: (builder) => ({
    postNotification: builder.mutation({
      query: ({ userId , message} : { userId: string; message: string}) => ({
        url: `/notifications/post/${userId}`,
        method: "POST",
        body: {
            message
        }
      }),
    }),
    getNotification: builder.query({
      query: ({ userId }: { userId: string }) => `/notifications/${userId}`,
    }),
    getUnreadNotification: builder.query({
      query: ({ userId }: { userId: string }) =>
        `/notifications/${userId}/unread`,
    }),
    deleteNotifications: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `/notifications/delete/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {useGetNotificationQuery,useGetUnreadNotificationQuery,usePostNotificationMutation,useDeleteNotificationsMutation,} = notificationApi

