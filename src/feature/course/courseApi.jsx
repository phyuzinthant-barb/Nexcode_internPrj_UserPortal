import { baseApi } from "../../global/baseApi";

const endPoint = "course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: `${endPoint}`,
        method: "GET",
      }),
      invalidatesTags: ["course"],
    }),

    getAllExamsByCourseId: builder.query({
      query: ({courseId}) => ({
        url: `user/${endPoint}/${courseId}/exams`,
        method: "GET",
      }),
      invalidatesTags: ["course"]
    }),

    getSearchCourseByCourseId : builder.query ({
      query: ({courseId}) => ({
        url: `user/${endPoint}?${courseId}`,
        method: "GET",
      }),
      invalidatesTags: ["course"]
    })
  }),
});

export const {
 useGetAllCoursesQuery, useGetAllExamsByCourseIdQuery
} = courseApi;
