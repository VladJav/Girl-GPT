import { apiSlice} from '../../../api/apiSlice';

export const activateAccountApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        activateAccount: build.mutation({
            query: ({ activateToken }) => ({
                url: `/auth/activate/${activateToken}`,
                method: 'PATCH',
            })
        }),
    })
});

export const { useActivateAccountMutation } = activateAccountApiSlice;