import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const admindashboardApi = createApi({
  reducerPath: "admindashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      getAdminDashboard: builder.query<any, void>({
        query: () => "/admindashboard/get",
      }),
      getTraficHabitStatus: builder.query<any, void>({
        query: () => "/admindashboard/get/trafic",
      }),
    };
  },
});

export const { useGetAdminDashboardQuery ,useGetTraficHabitStatusQuery} = admindashboardApi;
