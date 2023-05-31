import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api/v1'})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const { data } = await baseQuery('/auth/refresh-token', api, extraOptions);
        if (data) {
            localStorage.setItem('accessToken', data.accessToken);
            const newArgs = {...args, headers: {
                    Authorization: `Bearer ${data.accessToken}`
                }}
            result = await baseQuery(newArgs, api, extraOptions);

        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Message', 'Chat'],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
});

export const { useRegisterUserMutation } = apiSlice;