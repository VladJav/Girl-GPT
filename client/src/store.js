import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { currentChatReducer } from './modules/ChatList';

const store = configureStore({
    reducer: {
        currentChat: currentChatReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;