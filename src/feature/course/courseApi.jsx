import { baseApi } from "../../global/baseApi";

const endPoint = "course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: `${endPoint}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),

    getAllExamsByCourseId: builder.query({
      query: ({courseId}) => ({
        url: `user/${endPoint}/${courseId}/exams`,
        method: "GET",
      }),
      providesTags: ["course"]
    }),

    getSearchCourseByCourseId : builder.query ({
      query: ({courseId}) => ({
        url: `user/${endPoint}?${courseId}`,
        method: "GET",
      }),
      providesTags: ["course"]
    })
  }),
});

export const {
 useGetAllCoursesQuery, useGetAllExamsByCourseIdQuery
} = courseApi;
