import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import { EvaluationGeneralType } from "../../types";

export const evaluationGeneralApi = createApi({
  reducerPath: "evaluationGeneralApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DB_HOST,
    credentials: "include",
  }),
  endpoints: (buuilder) => ({
    getGeneralEvaluation: buuilder.query({
      query: ({ page, limit }: { page: number; limit: number }) => ({
        url: `/evaluationgeneral?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    postGeneralEvaluation: buuilder.mutation({
      query: ({about, problem, userId}: EvaluationGeneralType) => ({
        url: "/evaluationgeneral/post",
        method: "POST",
         body:{
            about: about,
            problem: problem,
            userId: userId
         },
      }),
    }),
    editGeneralEvaluation: buuilder.mutation({
      query: ( {id,body} : {id:string,body:EvaluationGeneralType}) => ({
        url: `/evaluationgeneral/edit/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteGeneralEvaluation: buuilder.mutation({
      query: (id: string) => ({
        url: `/evaluationgeneral/delete/${id}`,
        method: "DELETE",
      }),
    })
  }),
});

export const { useGetGeneralEvaluationQuery ,usePostGeneralEvaluationMutation, useEditGeneralEvaluationMutation, useDeleteGeneralEvaluationMutation} = evaluationGeneralApi;
