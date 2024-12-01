import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const jurnalApi = createApi({
  reducerPath: "jurnalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  tagTypes: ["Jurnal"],
  endpoints: (builder) => ({
    getJurnal: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `/months/${monthId}/monthWithJurnal/${userId}`,
      providesTags: [{ type: "Jurnal", id: "LIST" }],
    }),
    postJurnal: builder.mutation({
      query: ({
        monthId,
        userId,
        activity,
        date,
      }: {
        monthId: string;
        userId: string;
        activity: string;
        date: Date;
      }) => ({
        url: `/jurnal/post/${monthId}/${userId}`,
        method: "POST",
        body: {
          activity,
          date,
        },
      }),
      invalidatesTags: [{ type: "Jurnal", id: "LIST" }],
    }),
    editJurnal: builder.mutation({
      query: ({
        jurnalId,
        activity,
        date,
      }: {
        jurnalId: string;
        activity: string;
        date: Date;
      }) => ({
        url: `/jurnal/update/${jurnalId}`,
        method: "PATCH",
        body: {
          activity,
          date,
        },
      }),
      invalidatesTags: [{ type: "Jurnal", id: "LIST" }],
    }),
    deleteJurnal: builder.mutation({
      query: ({ jurnalId }: { jurnalId: string }) => ({
        url: `/jurnal/delete/${jurnalId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Jurnal", id: "LIST" }],
    }),
  }),
});

export const {
  useGetJurnalQuery,
  usePostJurnalMutation,
  useEditJurnalMutation,
  useDeleteJurnalMutation
} = jurnalApi;
