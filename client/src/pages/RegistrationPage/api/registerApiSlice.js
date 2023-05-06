import { apiSlice } from '../../../api/apiSlice';

export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        registerUser: build.mutation({
            query: initialUser => ({
                url: '/auth/register',
                method: 'POST',
                body: initialUser
            })
        })
    })
})

export const { useRegisterUserMutation } = registerApiSlice;