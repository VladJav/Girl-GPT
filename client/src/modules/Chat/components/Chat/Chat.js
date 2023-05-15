import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { BotMessage } from '../../../../components/BotMessage';
import { UserMessage } from '../../../../components/UserMessage';
import { useGetSingleChatQuery } from '../../api/chatApiSlice';
import { Button, TextField } from '@mui/material';
import MessagesList from '../MessagesList/MessagesList';

export default function Chat(){
    const accessToken = localStorage.getItem('accessToken');

    const { data, isSuccess } = useGetSingleChatQuery({
        accessToken,
        chatId: '644983f312f9c7fe6b5bf5cb',
    });

    const onClick = async () => {
        console.log(data);
    };
    return (
        <Grid container justifyContent={'center'}>
            {isSuccess && <MessagesList messages={data.chat.messages}/>}
            <Grid sx={{position: 'sticky', bottom:1}} item xs="auto">
                <TextField label={'Hi'}/>
            </Grid>
        </Grid>
    )
}