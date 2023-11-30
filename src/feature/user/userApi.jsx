import { baseApi } from "../../global/baseApi";

const endPoint = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeEmail: builder.mutation({
      query: ({userData}) => ({
          url: `${endPoint}/change-email`,
          method: "PUT",
          body: userData,
      }),
      invalidatesTags: ["user"],
  }),

  setNewPassword: builder.mutation({
    query: (updatedPws) => ({
      url: `${endPoint}/set-new-password`,
      method: "POST",
      body: updatedPws,
    }),
    invalidatesTags:["user"]
  }),

  getSignUpCourses: builder.query({
    query: () => ({
      url: `${endPoint}/courses`,
      method: "GET",
    }),
    invalidatesTags: ["user"]
  }),

  changePassword: builder.mutation({
    query: ({password}) => ({
      url: `${endPoint}/change-password`,
      method: "PUT",
      body: password,
    }),
    invalidatesTags: ["user"]
  })

  }),
});

export const { useChangeEmailMutation, useSetNewPasswordMutation, useGetSignUpCoursesQuery, useChangePasswordMutation } = userApi;
