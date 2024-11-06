import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Zidayah } from "../../types";
export const murajaahApi = createApi({
  reducerPath: "murajaahApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMurajaah: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `/months/${monthId}/monthWithMurajaah/${userId}`,
    }),
  }),
});


export const {useGetMurajaahQuery} = murajaahApi