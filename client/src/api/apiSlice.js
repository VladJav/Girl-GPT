import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1'}),
    endpoints: builder => ({
        registerUser: builder.mutation({
            query: initialUser => ({
                url: '/auth/register',
                method: 'POST',
                body: initialUser
            })
        })
    })
});

export const { useRegisterUserMutation } = apiSlice;