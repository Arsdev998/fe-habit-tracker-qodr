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
    getDateHijriah: builder.query<any, void>({
      query: () => `/cal/hijr?adj=-1`,
    }),
    getHadistRandom: builder.query<any, void>({
      query: () => `/hadits/arbain/acak`,
    }),
    getAyatRandom: builder.query<any, void>({
      query: () => "/quran/ayat/acak",
    }),
    getTimeStamp: builder.query<any, void>({
      query: () => `/tools/time`,
    }),
  }),
});

export const { useGetJadwalSholatQuery ,useGetDateHijriahQuery,useGetHadistRandomQuery, useGetAyatRandomQuery,useGetTimeStampQuery} = myquranApi;
