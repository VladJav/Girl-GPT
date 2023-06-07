import { apiSlice } from '../../../api/apiSlice';

export const forgotPasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        forgotPassword: build.mutation({
            query: body => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useForgotPasswordMutation } = forgotPasswordApiSlice;