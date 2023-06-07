import { apiSlice } from '../../../api/apiSlice';

export const updateChatApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        updateChat: build.mutation({
            query: ({ id, title, accessToken }) => ({
                url: `/chat/${id}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: {
                    title,
                },
            }),
            invalidatesTags: ['Chat'],
        }),
    }),
});

export const { useUpdateChatMutation } = updateChatApiSlice;