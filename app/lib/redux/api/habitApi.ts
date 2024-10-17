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
    }),
    postHabitUSer:builder.mutation({
      query:({monthId,userId,title}:{monthId:string; userId:string; title:string})=>({
        url:`/habit/post/${monthId}/habit/${userId}`,
        method:"POST",
        body:{
          title
        }
      })
    }),
    editHabitUser:builder.mutation({
      query:({habitId,title}:{habitId:string; title:string})=>({
        url:`/habit/update/${habitId}}`,
        method:"PUT",
        body:{
          title
        }
      })
    }),
    deletehabit:builder.mutation({
      query:({habitId}:{habitId:string})=>({
        url:`/habit/delete/${habitId}`,
        method:"DELETE"
      })
    })
  }),
});

export const { useGetAllMonthHabitsQuery, useGetMonthHabitsQuery ,useUpdateHabitStatusMutation,usePostHabitUSerMutation,useEditHabitUserMutation, useDeletehabitMutation} = habitApi;
