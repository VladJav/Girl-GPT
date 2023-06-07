import { apiSlice } from '../../../api/apiSlice';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getSingleChat: build.query({
            query: ({ chatId, accessToken }) => ({
                url: `/chat/${chatId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            providesTags: ['Message', 'Chat'],
        }),
        createChat: build.mutation({
            query: ({ accessToken }) => ({
                url: '/chat',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            invalidatesTags: ['Chat'],
        }),
    }),
});

export const { useGetSingleChatQuery, useCreateChatMutation } = chatApiSlice;