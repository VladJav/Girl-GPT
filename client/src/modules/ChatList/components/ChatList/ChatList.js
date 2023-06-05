import { Grid } from '@mui/material';
import { useGetAllChatsQuery } from '../../api/getAllChatsApiSlice';
import SelectChatButton from '../SelectChatButton/SelectChatButton';
import { useSelector } from 'react-redux';

export default function ChatList({changeCurrentChat}){
    const accessToken = localStorage.getItem('accessToken');

    const { id: currentChat } = useSelector(state => state.currentChat);
    const { data, isSuccess } = useGetAllChatsQuery({ accessToken });

    const onChatSelect = (clickedId) => {
        changeCurrentChat(clickedId);
    };

    return (
        <Grid container direction={'column'} sx={{backgroundColor: '#f0f0f0', height: '100vh'}}>
            <Grid container sx={{overflowX: 'hidden', overflowY: 'scroll'}}>
                {isSuccess && data.chats.map(e=>{
                    return <SelectChatButton chat={e} onClick={onChatSelect} selectedChatId={currentChat}/>
                    })}
            </Grid>
        </Grid>
    )

}