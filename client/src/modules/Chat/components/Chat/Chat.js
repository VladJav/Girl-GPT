import Grid from '@mui/material/Grid';
import { useCreateChatMutation, useGetSingleChatQuery } from '../../api/chatApiSlice';
import { TextField, Typography } from '@mui/material';
import MessagesList from '../MessagesList/MessagesList';
import { useCreateMessageMutation } from '../../api/messageApiSlice';
import { useSelector } from 'react-redux';

export default function Chat({ changeCurrentChat }) {
    const accessToken = localStorage.getItem('accessToken');
    const { id: chatId } = useSelector(state => state.currentChat);

    const { data, isSuccess } = useGetSingleChatQuery({
        accessToken,
        chatId,
    });

    const [ createMessage ] = useCreateMessageMutation();
    const [ createChat ] = useCreateChatMutation();

    const onSubmit = async (e) => {
        if (e.key === 'Enter') {
            const content = e.target.value;
            e.target.value = '';
            if (!chatId) {
                const { data: { chat } } = await createChat({ accessToken });
                changeCurrentChat(chat._id);
                await createMessage({ accessToken, chatId: chat._id, content });
            }
            else {
                await createMessage({ accessToken, chatId, content });
            }
        }
    };

    return (
        <Grid sx={{ backgroundColor: '#f5f5f5' }} container justifyContent={'center'} height={'100vh'}>
            {isSuccess ? <MessagesList messages={data.chat.messages}/> : <Grid container justifyContent={'center'} alignItems={'center'} >
                <Typography  sx={{ fontWeight: 'bold' }} variant={'h3'}>
                    Girl GPT
                </Typography>
            </Grid>}
            <Grid item xs={12} md={6}>
                <TextField
                    onKeyDown={onSubmit}
                    variant="filled"
                    sx={{ width: { xs: '100%', md: '50%' } , backgroundColor: '#dedede', borderRadius: '5px', position: 'fixed', bottom: 0 }}
                    placeholder={'Send a message.'}/>
            </Grid>
        </Grid>
    );
}