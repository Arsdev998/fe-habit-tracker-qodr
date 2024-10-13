import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Month } from "../../types";

export const habitApi = createApi({
  reducerPath: "habitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllMonthHabits: builder.query<Month[],void>({
      query: () => "/months", 
    }),
    getMonthHabits: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `months/${monthId}/monthWithHabitStatuses/${userId}`,
    }),
    updateHabitStatus: builder.mutation({
      query: ({dayId,habitId, userId,status}:{dayId:string; habitId:string; userId:string; status:boolean}) => ({
        url: "/habit/update",
        method: "PATCH",
        body: {
          dayId,
          habitId,
          userId,
          status,
        }
      })
    })
  }),
});

export const { useGetAllMonthHabitsQuery, useGetMonthHabitsQuery ,useUpdateHabitStatusMutation} = habitApi;
