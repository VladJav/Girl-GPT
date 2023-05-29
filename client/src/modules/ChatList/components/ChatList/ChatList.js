import { Grid } from '@mui/material';
import { useGetAllChatsQuery } from '../../api/getAllChatsApiSlice';
import { useState } from 'react';
import SelectChatButton from '../SelectChatButton/SelectChatButton';

export default function ChatList(){
    const accessToken = localStorage.getItem('accessToken');

    const { data, isSuccess } = useGetAllChatsQuery({ accessToken });
    const [clickedId, setClickedId] = useState(0);

    const onClick = (clickedId) => {
        setClickedId(clickedId);
    }
    return (
        <Grid container direction={'column'} md={2} xs={5} sx={{backgroundColor: '#f0f0f0', height: '100vh'}}>
            <Grid container sx={{overflowX: 'hidden', overflowY: 'scroll'}}>
                {isSuccess && data.chats.map(e=>{
                    return <SelectChatButton chat={e} onClick={onClick} selectedChatId={clickedId}/>
                    })}
            </Grid>
        </Grid>
    )

}