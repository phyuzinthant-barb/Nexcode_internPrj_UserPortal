import { baseApi } from "../../global/baseApi";

const endPoint = "history";

export const historyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExamsWhichUserTaken: builder.query({
      query: () => ({
        url: `user/exam/${endPoint}`,
        method: "GET",
      }),
      invalidatesTags: ["history"],
    }),

    getViewAnswerSheet: builder.query({
      query: ({ examId }) => ({
        url: `/user/exam/${endPoint}/${examId}`,
        method: "GET",
      }),
      invalidatesTags: ["history"],
    }),
  }),
});

export const { useGetAllExamsWhichUserTakenQuery, useGetViewAnswerSheetQuery } =
  historyApi;
