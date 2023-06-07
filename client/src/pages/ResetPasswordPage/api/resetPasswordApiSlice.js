import { apiSlice } from '../../../api/apiSlice';

export const resetPasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: build =>  ({
        resetPassword: build.mutation({
            query: ({ resetToken, newPassword1, newPassword2 }) => ({
                url: `/auth/reset-password/${resetToken}`,
                method: 'PATCH',
                body: {
                    newPassword1,
                    newPassword2,
                },
            }),
        }),
    }),
});

export const { useResetPasswordMutation } = resetPasswordApiSlice;