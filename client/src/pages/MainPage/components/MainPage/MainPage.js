import { Grid } from '@mui/material';
import { ChatList } from '../../../../modules/ChatList';
import { Chat } from '../../../../modules/Chat';
import { useDispatch } from 'react-redux';
import { changeChat } from '../../slices/currentChatSlice';

export default function MainPage() {

    const dispatch = useDispatch();

    const changeCurrentChat = (clickedId) => {
        dispatch(
            changeChat({
                id: clickedId,
            }),
        );
    };

    return (
        <Grid container>
            <Grid item md={2} xs={1} >
                <ChatList changeCurrentChat={changeCurrentChat}></ChatList>
            </Grid>
            <Grid item md={10} xs={11}>
                <Chat changeCurrentChat={changeCurrentChat}></Chat>
            </Grid>
        </Grid>
    );
}