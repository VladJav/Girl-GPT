import Grid from '@mui/material/Grid';
import { useGetSingleChatQuery } from '../../api/chatApiSlice';
import { TextField } from '@mui/material';
import MessagesList from '../MessagesList/MessagesList';
import { useCreateMessageMutation } from '../../api/messageApiSlice';

export default function Chat(){
    const accessToken = localStorage.getItem('accessToken');
    const chatId = '64651edf84fd13bc0a87e27a';

    const { data, isSuccess } = useGetSingleChatQuery({
        accessToken,
        chatId
    });

    const [ createMessage ] = useCreateMessageMutation();

    const onSubmit = async (e) => {
        if(e.key === 'Enter'){
            const content = e.target.value;
            const res = await createMessage({accessToken, chatId, content });
            e.target.value = '';
        }
    }
    return (
        <Grid container justifyContent={'center'} height={'100vh'}>
            {isSuccess && <MessagesList messages={data.chat.messages}/>}
            <Grid item xs={12} md={6}>
                <TextField onKeyDown={onSubmit} variant="filled" sx={{ width: '50%' , backgroundColor: '#dedede', borderRadius: '5px', position: 'fixed', bottom: 0}} placeholder={'Send a message.'}/>
            </Grid>
        </Grid>
    )
}