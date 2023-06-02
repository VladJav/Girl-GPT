import { Grid } from '@mui/material';
import { ChatList } from '../../../../modules/ChatList';
import { Chat } from '../../../../modules/Chat';

export default function MainPage(){
    return (
        <Grid container>
            <Grid item md={2} xs={1} >
                <ChatList></ChatList>
            </Grid>
            <Grid item md={10} xs={11}>
                <Chat></Chat>
            </Grid>
        </Grid>
    )
}