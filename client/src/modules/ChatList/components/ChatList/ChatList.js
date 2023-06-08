import { Button, Grid } from '@mui/material';
import { useGetAllChatsQuery } from '../../api/getAllChatsApiSlice';
import SelectChatButton from '../SelectChatButton/SelectChatButton';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

export default function ChatList({ changeCurrentChat }) {
    const accessToken = localStorage.getItem('accessToken');

    const { id: currentChat } = useSelector(state => state.currentChat);
    const { data, isSuccess } = useGetAllChatsQuery({ accessToken });

    const onChatSelect = (clickedId) => {
        changeCurrentChat(clickedId);
    };

    const onClickCreate = async () => {
        changeCurrentChat(null);
    };

    return (
        <Grid container direction={'column'} sx={{ backgroundColor: '#f0f0f0', height: '100vh' }}>
            <Grid container sx={{ overflowX: 'hidden', overflowY: 'scroll' }}>
                <Button onClick={onClickCreate} fullWidth sx={{ color: '#414141', borderColor: 'secondary.main', border: 2 }}><AddIcon/>New Chat</Button>
                {isSuccess && data.chats.map(e => {
                    return <SelectChatButton chat={e} onClick={onChatSelect} selectedChatId={currentChat} key={e._id}/>;
                })}
            </Grid>
        </Grid>
    );

}