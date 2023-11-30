import { baseApi } from "../../global/baseApi";

const endPoint = "exam";

export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStartExam: builder.query({
      query: ({examId}) => ({
        url: `user/${endPoint}/${examId}/start`,
        method: "GET",
      }),
      invalidatesTags: ["exam"],
    }),

    submitExam: builder.mutation({
      query: ({ examId, answerData }) => ({
        url: `user/${endPoint}/${examId}/submit`,
        method: "POST",
        body: answerData,
      }),
      invalidatesTags: ["exam"]
    })
  }),
});

export const {
 useGetStartExamQuery, useSubmitExamMutation
} = examApi;
