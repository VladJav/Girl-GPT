import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../../../ui';
import { Alert } from '@mui/material';
import { useActivateAccountMutation } from '../../api/activateAccountApiSlice';
import { useLoaderData } from 'react-router-dom';

const theme = createTheme();

export default function ActivateAccountPage() {

    const [activateAccount, {error, isSuccess}] = useActivateAccountMutation();
    const { token } = useLoaderData();

    const onSubmit = async (e) => {
        try{
            e.preventDefault();
            console.log(token);
            await activateAccount({activateToken: token});
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Activate
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Click here to activate
                        </Button>
                        {error && <Alert severity="error">{error.data.msg}</Alert>}
                        {isSuccess && <Alert severity="success">Success!</Alert>}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}