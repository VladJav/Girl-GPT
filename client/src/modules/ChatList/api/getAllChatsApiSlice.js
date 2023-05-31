import { apiSlice} from '../../../api/apiSlice';

export const getAllChatsApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getAllChats: build.query({
            query: ( { accessToken } ) => ({
                url: '/chat',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }),
            providesTags: ['Chat']
        }),
    }),
});

export const { useGetAllChatsQuery } = getAllChatsApiSlice;