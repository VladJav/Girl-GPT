import { apiSlice } from '../../../api/apiSlice';

export const loginApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        loginUser: build.mutation({
            query: body => ({
                url: '/auth/login',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const { useLoginUserMutation } = loginApiSlice;