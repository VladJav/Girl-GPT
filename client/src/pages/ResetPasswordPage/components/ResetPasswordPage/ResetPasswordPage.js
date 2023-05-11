import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../../../ui';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { useResetPasswordMutation } from '../../api/resetPasswordApiSlice';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function ResetPasswordPage() {
    const {register, formState: { errors }, handleSubmit} = useForm({
        mode: 'onBlur'
    });

    const [resetPassword, { error, isSuccess }] = useResetPasswordMutation();
    const { token } = useLoaderData();

    const onSubmit = async data => {
        const { password1, password2 } = data;

        try{
            await resetPassword({resetToken: token, newPassword1: password1, newPassword2: password2});
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
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password1"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password1', {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password is too short'
                                },
                                maxLength: {
                                    value: 32,
                                    message: 'Password is too long'
                                }
                            })}
                            error={errors.password1 && true}
                            helperText={errors.password1?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password2', {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password is too short'
                                },
                                maxLength: {
                                    value: 32,
                                    message: 'Password is too long'
                                }
                            })}
                            error={errors.password2 && true}
                            helperText={errors.password2?.message}
                        />
                        {error && <Alert severity="error">{error.data.msg}</Alert>}
                        {isSuccess && <Alert severity="success">Success!</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}