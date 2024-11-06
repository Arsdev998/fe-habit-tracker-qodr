import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const accessKey = process.env.NEXT_PUBLIC_DB_UNSPLASH_ACCESS_KEY;
export const unsplashApi = createApi({
  reducerPath: "unsplashApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_UNSPLASH_API,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  }),
  endpoints: (builder) => ({
    getRandomFoto: builder.query<any, void>({
      query: () => `/photos/random?query=islamic`,
    }),
  }),
});

export const { useGetRandomFotoQuery } = unsplashApi;
