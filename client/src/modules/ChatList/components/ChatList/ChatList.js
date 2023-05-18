import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';

const chats = [
    {
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },{
        _id: 1,
        title: 'Abs',
    },
    {
        _id: 2,
        title: 'Abs',
    },
    {
        _id: 3,
        title: 'Abs',
    },

]
export default function ChatList(){

    return (
        <Grid container direction={'column'} xs={2} sx={{backgroundColor: '#f0f0f0', height: '100vh'}}>
            <Grid container overflow={'auto'}>
                {chats.map(e=>{
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