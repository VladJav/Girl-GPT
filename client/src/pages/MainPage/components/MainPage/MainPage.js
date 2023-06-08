import { Drawer, Grid, IconButton } from '@mui/material';
import { ChatList } from '../../../../modules/ChatList';
import { Chat } from '../../../../modules/Chat';
import { useDispatch } from 'react-redux';
import { changeChat } from '../../slices/currentChatSlice';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function MainPage() {

    const dispatch = useDispatch();
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const changeCurrentChat = (clickedId) => {
        dispatch(
            changeChat({
                id: clickedId,
            }),
        );
    };

    return (
        <Grid container>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {setIsHamburgerOpen(true);}}
                sx={{
                    mr: 2,
                    display: {
                        xs: 'block',
                        sm: 'none',
                    },
                }}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={isHamburgerOpen}
                onClose={() => {setIsHamburgerOpen(false);}}
                onOpen={() => {setIsHamburgerOpen(false);}}>
                <Grid container>
                    <IconButton>
                        <CloseIcon onClick={() => {setIsHamburgerOpen(false);}} />
                    </IconButton>
                    <Grid item>
                        <ChatList changeCurrentChat={changeCurrentChat}></ChatList>
                    </Grid>
                </Grid>
            </Drawer>
            <Grid item md={2} sm={4} sx={{ display: { xs: 'none', sm: 'flex' } }} >
                <ChatList changeCurrentChat={changeCurrentChat}></ChatList>
            </Grid>
            <Grid item md={10} xs={12} sm={8}>
                <Chat changeCurrentChat={changeCurrentChat}></Chat>
            </Grid>
        </Grid>
    );
}