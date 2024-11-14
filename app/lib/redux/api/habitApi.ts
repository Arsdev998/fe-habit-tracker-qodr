import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Habit, Month } from "../../types";

export const habitApi = createApi({
  reducerPath: "habitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllHabit: builder.query<Habit[], void>({
      query: () => "/habit/get",
    }),
    getAllMonthHabits: builder.query<Month[], void>({
      query: () => "/months",
    }),
    getMonthHabits: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `months/${monthId}/monthWithHabitStatuses/${userId}`,
    }),
    updateHabitStatus: builder.mutation({
      query: ({
        dayId,
        habitId,
        userId,
        status,
      }: {
        dayId: string;
        habitId: string;
        userId: string;
        status: boolean;
      }) => ({
        url: "/habit/update",
        method: "PATCH",
        body: {
          dayId,
          habitId,
          userId,
          status,
        },
      }),
    }),
    postHabitUSer: builder.mutation({
      query: ({
        monthId,
        userId,
        title,
        maxDays,
      }: {
        monthId: string;
        userId: string;
        title: string;
        maxDays: number | null;
      }) => ({
        url: `/habit/post/${monthId}/habit/${userId}`,
        method: "POST",
        body: {
          title,
          maxDays: maxDays !== undefined ? maxDays : null,
        },
      }),
    }),
    editHabitUser: builder.mutation({
      query: ({
        habitId,
        title,
        maxDays,
      }: {
        habitId: string;
        title: string;
        maxDays: number | null;
      }) => ({
        url: `/habit/update/${habitId}}`,
        method: "PUT",
        body: {
          title,
          maxDays: maxDays !== undefined ? maxDays : null,
        },
      }),
    }),
    deletehabit: builder.mutation({
      query: ({ habitId }: { habitId: string }) => ({
        url: `/habit/delete/${habitId}`,
        method: "DELETE",
      }),
    }),
    posthabitAdmin: builder.mutation({
      query: ({
        title,
        maxDays,
      }: {
        title: string;
        maxDays: number | null;
      }) => ({
        url: `/habit/post`,
        method: "POST",
        body: {
          title,
          maxDays: maxDays !== undefined ? maxDays : null,
        },
      }),
    }),
  }),
});

export const {
  useGetAllHabitQuery,
  useGetAllMonthHabitsQuery,
  useGetMonthHabitsQuery,
  useUpdateHabitStatusMutation,
  usePostHabitUSerMutation,
  useEditHabitUserMutation,
  useDeletehabitMutation,
} = habitApi;
