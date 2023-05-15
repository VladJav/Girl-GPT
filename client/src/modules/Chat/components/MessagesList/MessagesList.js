import { UserMessage } from '../../../../components/UserMessage';
import { BotMessage } from '../../../../components/BotMessage';
import { Grid } from '@mui/material';

export default function MessagesList({ messages }){
    return (
        <Grid container sx={{marginBottom:'5%'}}>
            {messages.map(e=>{
                if(e.role==='user'){
                    return <UserMessage author={"as"} message={e.content}/>
                }
                if(e.role==='assistant'){
                    return <BotMessage message={e.content}/>
                }
            })}
        </Grid>
    )
}