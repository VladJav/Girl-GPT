import { apiSlice } from '../../../api/apiSlice';

export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        registerUser: build.mutation({
            query: body => ({
                url: '/auth/register',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = registerApiSlice;