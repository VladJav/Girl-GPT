import { Button, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteChatMutation } from '../../api/deleteChatApiSlice';
import { useState } from 'react';
import EditingChatButton from '../EditingChatButton/EditingChatButton';
import { useUpdateChatMutation } from '../../api/updateChatApiSlice';

const buttonStyles = {
    width: '100%',
    color: '#414141',
}
export default function SelectChatButton({ chat, onClick, selectedChatId }){

    const accessToken = localStorage.getItem('accessToken');
    const [ deleteChat ] = useDeleteChatMutation();
    const [ updateChat ] = useUpdateChatMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(chat.title)


    const onEdit = async () => {
        setIsEditing(false);
        await updateChat({title: newTitle, id: chat._id, accessToken});
    };

    const onDelete = async () => {
        await deleteChat({accessToken, id: chat._id});
    };

    return (
        <Grid xs={12} item>
            {isEditing ? <EditingChatButton title={newTitle} setTitle={setNewTitle} onSubmit={onEdit}/> : <Button onClick={()=> {onClick(chat._id)}} sx={buttonStyles} variant="text">
                <Grid container xs={12}>
                    <Grid item xs={9} md={8}>
                        <Typography sx={{ overflow: 'hidden', textAlign: 'left'}}>{chat.title}</Typography>
                    </Grid>
                    <Grid container xs={3} md={4}>
                        <Grid item xs={6}>
                            <IconButton onClick={()=>{setIsEditing(!isEditing);}} size="small" onMouseDown={(e)=>{
                                e.stopPropagation();}}>
                                {selectedChatId===chat._id && <EditIcon/>}
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton onClick={onDelete} size="small" onMouseDown={(e)=>{
                                e.stopPropagation();}}>
                                {selectedChatId===chat._id && <DeleteIcon/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Button>}
        </Grid>
    )
}