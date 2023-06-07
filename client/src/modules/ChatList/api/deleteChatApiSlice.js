import { apiSlice } from '../../../api/apiSlice';

export const deleteChatApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        deleteChat: build.mutation({
            query: ({ id, accessToken }) => ({
                url: `/chat/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            invalidatesTags: ['Chat'],
        }),
    }),
});

export const { useDeleteChatMutation } = deleteChatApiSlice;
