import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useGetAllChatsQuery } from '../../api/getAllChatsApiSlice';

export default function ChatList(){
    const accessToken = localStorage.getItem('accessToken');

    const { data, isSuccess } = useGetAllChatsQuery({ accessToken });

    return (
        <Grid container direction={'column'} xs={2} sx={{backgroundColor: '#f0f0f0', height: '100vh'}}>
            <Grid container overflow={'auto'}>
                {isSuccess && data.chats.map(e=>{
                        return <Grid xs={12} item key={e._id}>
                            <Button sx={{width: '100%', color: '#414141'}} variant="text">
                                <Typography>{e.title}</Typography>
                            </Button>
                        </Grid>
                    })}
            </Grid>
        </Grid>
    )

}