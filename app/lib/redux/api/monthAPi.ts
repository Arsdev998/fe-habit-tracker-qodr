import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Month, MonthReq } from "../../types";

export const monthApi = createApi({
  reducerPath: "monthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  tagTypes: ["Month"],
  endpoints: (builder) => ({
    getAllMonth: builder.query<Month[], void>({
      query: () => "/months",
      providesTags: ["Month"],
    }),
    postMonth: builder.mutation<MonthReq, MonthReq>({
      query: ({ name, year }: { name: string; year: number }) => ({
        url: "/months/create",
        method: "POST",
        body: {
          name: name,
          year: year,
        },
      }),
    }),
  }),
});

export const { usePostMonthMutation, useGetAllMonthQuery } = monthApi;
