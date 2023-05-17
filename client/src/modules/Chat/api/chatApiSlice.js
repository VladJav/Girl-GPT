import { apiSlice} from '../../../api/apiSlice';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getSingleChat: build.query({
            query: ( { chatId, accessToken } ) => ({
                url: `/chat/${chatId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }),
            providesTags: ['Message'],
        }),
    }),
});

export const { useGetSingleChatQuery } = chatApiSlice;