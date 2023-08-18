import React, {FC} from 'react';
import {Layout, Row} from "antd";
import RegisterForm from "../components/RegisterForm";
import {Container, Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";

const Register:FC = () => {
    return (
        <Container maxWidth="xs">
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <RegisterForm />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;