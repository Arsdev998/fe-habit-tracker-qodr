import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const evaluationApi = createApi({
    reducerPath: "evaluationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getAllEvaluation: builder.query({
            query: ({page,limit}: {page: number;limit: number}) => ({
                url: `/evaluation?page=${page}&limit=${limit}`,
                method: "GET",
            })
        }),
        postEvaluation: builder.mutation({
            query: (body) => ({
                url: "/evaluation/post",
                method: "POST",
                body,
            }),
        })
    }),
})

export const {useGetAllEvaluationQuery,usePostEvaluationMutation} = evaluationApi