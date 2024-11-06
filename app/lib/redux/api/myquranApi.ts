import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const myquranApi = createApi({
  reducerPath: "myquranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_MYQURAN_API,
    // credentials: "include",
  }),
  endpoints: (builder) => ({
    getJadwalSholat: builder.query({
      query: ({ cityId, dateToday }: { cityId: string; dateToday: string }) =>
        `/sholat/jadwal/${cityId}/${dateToday}`,
    }),
    getDateHijriah: builder.query<any,void>({
      query: () => `/cal/hijr?adj=-1`,
    }),
  }),
});

export const { useGetJadwalSholatQuery ,useGetDateHijriahQuery} = myquranApi;
