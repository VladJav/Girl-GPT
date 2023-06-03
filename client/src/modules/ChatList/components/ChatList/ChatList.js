import { Grid } from '@mui/material';
import { useGetAllChatsQuery } from '../../api/getAllChatsApiSlice';
import SelectChatButton from '../SelectChatButton/SelectChatButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeChat } from '../../slices/currentChatSlice';

export default function ChatList(){
    const accessToken = localStorage.getItem('accessToken');

    const dispatch = useDispatch();
    const { id: currentChat } = useSelector(state => state.currentChat);
    const { data, isSuccess } = useGetAllChatsQuery({ accessToken });

    const onClick = (clickedId) => {
        dispatch(
            changeChat({
                id: clickedId,
            })
        );
    }
    return (
        <Grid container direction={'column'} sx={{backgroundColor: '#f0f0f0', height: '100vh'}}>
            <Grid container sx={{overflowX: 'hidden', overflowY: 'scroll'}}>
                {isSuccess && data.chats.map(e=>{
                    return <SelectChatButton chat={e} onClick={onClick} selectedChatId={currentChat}/>
                    })}
            </Grid>
        </Grid>
    )

}