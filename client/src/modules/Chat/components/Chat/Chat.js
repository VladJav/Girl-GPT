import Grid from '@mui/material/Grid';
import { useGetSingleChatQuery } from '../../api/chatApiSlice';
import { TextField, Typography } from '@mui/material';
import MessagesList from '../MessagesList/MessagesList';
import { useCreateMessageMutation } from '../../api/messageApiSlice';

export default function Chat(){
    const accessToken = localStorage.getItem('accessToken');
    const chatId = '2';

    const { data, isSuccess } = useGetSingleChatQuery({
        accessToken,
        chatId
    });

    const [ createMessage ] = useCreateMessageMutation();

    const onSubmit = async (e) => {
        if(e.key === 'Enter'){
            const content = e.target.value;
            await createMessage({accessToken, chatId, content });
            e.target.value = '';
        }
    };

    return (
        <Grid container justifyContent={'center'} height={'100vh'}>
            {isSuccess ? <MessagesList messages={data.chat.messages}/> : <Grid container justifyContent={'center'} alignItems={'center'} >
                <Typography  sx={{ fontWeight: 'bold' }} variant={'h3'}>
                    Girl GPT
                </Typography>
            </Grid>}
            <Grid item xs={12} md={6}>
                <TextField onKeyDown={onSubmit} variant="filled" sx={{ width: '50%' , backgroundColor: '#dedede', borderRadius: '5px', position: 'fixed', bottom: 0}} placeholder={'Send a message.'}/>
            </Grid>
        </Grid>
    )
}