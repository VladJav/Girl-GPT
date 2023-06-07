import { UserMessage } from '../../../../components/UserMessage';
import { BotMessage } from '../../../../components/BotMessage';
import { Grid } from '@mui/material';

export default function MessagesList({ messages }) {
    return (
        <Grid container sx={{ marginBottom:'5%' }}>
            {messages.map(e => {
                if (e.role === 'user') {
                    return <UserMessage key={e._id} author={'as'} message={e.content}/>;
                }
                if (e.role === 'assistant') {
                    return <BotMessage key={e._id} message={e.content}/>;
                }
            })}
        </Grid>
    );
}