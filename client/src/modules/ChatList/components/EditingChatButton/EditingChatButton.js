import { Button, Grid, IconButton, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from '@mui/material';

const buttonStyles = {
    width: '100%',
    color: '#414141',
}

export default function EditingChatButton({title, setTitle, onSubmit}){

    return (
        <Button sx={buttonStyles} variant="text">
            <Grid container xs={12}>
                <Grid item xs={9} md={8}>
                    <Input value={title} onChange={(e)=>{setTitle(e.target.value)}} onMouseDown={(e)=>{
                        e.stopPropagation();}}/>
                </Grid>
                <Grid container xs={3} md={4}>
                    <Grid item xs={6}>
                        <IconButton onClick={onSubmit} size="small" onMouseDown={(e)=>{
                            e.stopPropagation();}}>
                            <DoneIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton size="small" onMouseDown={(e)=>{
                            e.stopPropagation();}}>
                            <ClearIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Button>
    )
}