import { apiSlice} from '../../../api/apiSlice';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getSingleChat: build.query({
            query: ( { chatId, accessToken } ) => ({
                url: `/api/v1/chat/${chatId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }),
        }),
    }),
});

export const { useGetSingleChatQuery } = chatApiSlice;