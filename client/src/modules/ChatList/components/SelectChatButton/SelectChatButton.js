import { Button, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const buttonStyles = {
    width: '100%',
    color: '#414141',
}
export default function SelectChatButton({ chat, onClick, selectedChatId }){


    const onEdit = () => {

    };

    const onDelete = () => {

    };

    return (
        <Grid xs={12} item>
            <Button onClick={()=> {onClick(chat._id)}} sx={buttonStyles} variant="text">
                <Grid container xs={12}>
                    <Grid item xs={9} md={8}>
                        <Typography sx={{ overflow: 'hidden', textAlign: 'left'}}>{chat.title}</Typography>
                    </Grid>
                    <Grid container xs={3} md={4}>
                        <Grid item xs={6}>
                            <IconButton size="small" onMouseDown={(e)=>{
                                e.stopPropagation();}}>
                                {selectedChatId===chat._id && <EditIcon/>}
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton size="small" onMouseDown={(e)=>{
                                e.stopPropagation();}}>
                                {selectedChatId===chat._id && <DeleteIcon/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    )
}