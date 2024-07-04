import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_key } from "../databases/realtimeDataBase";

const authBaseUrl = "https://identitytoolkit.googleapis.com/v1/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: authBaseUrl }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }) => ({
        url: `accounts:signUp?key=${api_key}`,
        method: `POST`,
        body: { email, password, returnSecureToken: true },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `accounts:signInWithPassword?key=${api_key}`,
        method: `POST`,
        body: { email, password, returnSecureToken: true },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
