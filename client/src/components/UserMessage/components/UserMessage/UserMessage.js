import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const messageContainerStyle = {
    padding: '30px 0',
};
export default function BotMessage({ message, author }) {
    return (
        <Grid container sx={messageContainerStyle} justifyContent="center" xs={12}>
            <Grid container md={6} xs={12}>
                <Grid justifyContent="center" container xs={2}>
                    <Avatar variant="rounded">{author}</Avatar>
                </Grid>
                <Grid item xs={10} zeroMinWidth>
                    <Typography>{message}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}