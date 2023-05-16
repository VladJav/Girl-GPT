import Grid from '@mui/material/Grid';
import { useGetSingleChatQuery } from '../../api/chatApiSlice';
import { TextField } from '@mui/material';
import MessagesList from '../MessagesList/MessagesList';

export default function Chat(){
    const accessToken = localStorage.getItem('accessToken');

    const { data, isSuccess } = useGetSingleChatQuery({
        accessToken,
        chatId: '644983f312f9c7fe6b5bf5cb',
    });

    return (
        <Grid container justifyContent={'center'}>
            {isSuccess && <MessagesList messages={data.chat.messages}/>}
            <Grid sx={{position: 'sticky', bottom:0}} item xs={12} md={7}>
                <TextField fullWidth variant="filled" sx={{backgroundColor: '#dedede', borderRadius: '5px'}} placeholder={'Send a message.'}/>
            </Grid>
        </Grid>
    )
}