import React, { FC } from 'react';
import { Container, Grid } from '@mui/material';
import LoginForm from '../components/LoginForm';

const Login: FC = () => {

    return (
        <Container maxWidth="xs">
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
