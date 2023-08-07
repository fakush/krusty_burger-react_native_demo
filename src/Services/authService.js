import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://identitytoolkit.googleapis.com/v1' }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (auth) => ({
                url: `/accounts:signUp?key=${api_key}`,
                method: `POST`,
                body: auth
            })
        }),
        signIn: builder.mutation({
            query: (auth) => ({
                url: `/accounts:signInWithPassword?key=${firebaseApiKey}`,
                method: `POST`,
                body: auth
            })
        })
    })
})

export const {
    useSignUpMutation,
    useSignInMutation
} = authApi