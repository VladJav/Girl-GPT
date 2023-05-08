import { apiSlice } from './apiSlice';

export const showMeApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        showMe: build.query({
            query: ({ accessToken }) => ({
                url: '/users/showMe',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }),
        })
    })
});

export const { useShowMeQuery } = showMeApiSlice;