import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const habitApi = createApi({
  reducerPath: "habitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllMonthHabits: builder.query({
      query: () => "months", 
    }),
    getMonthHabits: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `months/${monthId}/monthWithHabitStatuses/${userId}`,
    }),
  }),
});

export const { useGetAllMonthHabitsQuery, useGetMonthHabitsQuery } = habitApi;
