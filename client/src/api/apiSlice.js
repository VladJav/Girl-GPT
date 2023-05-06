import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1'}),
    endpoints: () => ({})
});

export const { useRegisterUserMutation } = apiSlice;