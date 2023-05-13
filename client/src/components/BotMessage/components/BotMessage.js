import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const messageContainerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '30px 0'
}
export default function BotMessage({ message }){
    return (
        <Grid container sx={messageContainerStyle} justifyContent="center" xs={12}>
            <Grid container md={6} xs={12}>
                <Grid justifyContent="center" container xs={2}>
                    <Avatar variant="rounded" src="/bot.jpg"></Avatar>
                </Grid>
                <Grid item xs={10} zeroMinWidth>
                    <Typography>{message}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}