import React, {FC} from 'react';
import RegisterForm from "../components/RegisterForm";
import {Container, Grid} from "@mui/material";

const Register:FC = () => {
    return (
        <Container maxWidth="xs">
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <RegisterForm />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;