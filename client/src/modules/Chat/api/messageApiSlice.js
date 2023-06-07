import { apiSlice } from '../../../api/apiSlice';

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        createMessage: build.mutation({
            query: ({ accessToken, chatId, content }) => ({
                url: '/message',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: {
                    chat: chatId,
                    content,
                },
            }),
            invalidatesTags: ['Message'],
        }),
    }),
});

export const { useCreateMessageMutation } = messageApiSlice;