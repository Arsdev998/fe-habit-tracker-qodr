import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const tilawahApi = createApi({
  reducerPath: "tilawahApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  tagTypes: ["Tilawah"],
  endpoints: (builder) => ({
    getTilawah: builder.query({
      query: ({ monthId, userId }: { monthId: string; userId: string }) =>
        `/months/${monthId}/monthWithTilawah/${userId}`,
      providesTags: [{ type: "Tilawah", id: "LIST" }],
    }),
    postTilawah: builder.mutation({
      query: ({
        monthId,
        userId,
        surah,
        lembar,
      }: {
        monthId: string;
        userId: string;
        surah: string;
        lembar: number;
      }) => ({
        url: `/tilawah/post/${monthId}/${userId}`,
        method: "POST",
        body: {
          surah,
          lembar,
        },
      }),
    }),
    editTilawah: builder.mutation({
      query: ({
        tilawahId,
        surah,
        lembar,
      }: {
        tilawahId: string;
        surah: string;
        lembar: number;
      }) => ({
        url: `/tilawah/update/${tilawahId}`,
        method: "PATCH",
        body: {
          surah,
          lembar,
        },
      }),
    }),
    deleteTilawah: builder.mutation({
      query: ({ tilawahId }: { tilawahId: string }) => ({
        url: `/tilawah/delete/${tilawahId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTilawahQuery,
  usePostTilawahMutation,
  useEditTilawahMutation,
  useDeleteTilawahMutation,
} = tilawahApi;
