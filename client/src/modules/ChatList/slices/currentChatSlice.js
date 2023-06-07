import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
};

const currentChatSlice = createSlice({
    name: 'currentChat',
    initialState,
    reducers: {
        changeChat(state, action) {
            state.id = action.payload.id;
        },
    },
});

export const { changeChat } = currentChatSlice.actions;
export default currentChatSlice.reducer;