import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line no-undef
const rootUrl = process.env.NODE_ENV === 'production' ? 'https://seahorse-app-5765m.ondigitalocean.app' : '';

const baseQuery = fetchBaseQuery({ baseUrl: `${rootUrl}/api/v1` });

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const { data } = await baseQuery('/auth/refresh-token', api, extraOptions);
        if (data) {
            localStorage.setItem('accessToken', data.accessToken);
            const newArgs = { ...args,
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                } };
            result = await baseQuery(newArgs, api, extraOptions);

        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Message', 'Chat'],
    baseQuery: baseQueryWithReauth,
    prepareHeaders: (headers) => {
        return headers;
    },
    endpoints: () => ({}),
});

export const { useRegisterUserMutation } = apiSlice;