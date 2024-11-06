import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    postMurajaah: builder.mutation({
      query: ({
        monthId,
        userId,
        surah,
        date,
      }: {
        monthId: string;
        userId: string;
        surah: string;
        date: Date;
      }) => ({
        url: `/murajaah/post/${monthId}/${userId}`,
        method: "POST",
        body: {
          surah,
          date,
        },
      }),
    }),
    editMurajaah: builder.mutation({
      query: ({
        murajaahId,
        surah,
        date,
      }: {
        murajaahId: string;
        surah: string;
        date: Date;
      }) => ({
        url: `/murajaah/update/${murajaahId}`,
        method: "PATCH",
        body: {
          surah,
          date,
        },
      }),
    }),
    deleteMurajaah: builder.mutation({
      query: ({ murajaahId }: { murajaahId: string }) => ({
        url: `/murajaah/delete/${murajaahId}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {useGetMurajaahQuery, usePostMurajaahMutation, useEditMurajaahMutation,useDeleteMurajaahMutation} = murajaahApi;