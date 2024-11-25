import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ziyadahApi = createApi({
  reducerPath: "ziyadahApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  tagTypes: ["Ziyadah"],
  endpoints: (builder) => ({
    getZiyadah: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `/months/${monthId}/monthWithZiyadah/${userId}`,
      providesTags: [{ type: "Ziyadah", id: "LIST" }],
    }),
    postZiyadah: builder.mutation({
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
        url: `/ziyadah/post/${monthId}/${userId}`,
        method: "POST",
        body: {
          surah,
          date,
        },
      }),
      invalidatesTags: [{ type: "Ziyadah", id: "LIST" }],
    }),
    editZiyadah: builder.mutation({
      query: ({
        ziyadahId,
        surah,
        date,
      }: {
        ziyadahId: string;
        surah: string;
        date: Date;
      }) => ({
        url: `/ziyadah/update/${ziyadahId}`,
        method: "PATCH",
        body: {
          surah,
          date,
        },
      }),
      invalidatesTags: [{ type: "Ziyadah", id: "LIST" }],
    }),
    deleteZiyadah: builder.mutation({
      query: ({ ziyadahId }: { ziyadahId: string }) => ({
        url: `/ziyadah/delete/${ziyadahId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Ziyadah", id: "LIST" }],
    }),
  }),
});

export const {
  useGetZiyadahQuery,
  usePostZiyadahMutation,
  useEditZiyadahMutation,
  useDeleteZiyadahMutation,
} = ziyadahApi;
