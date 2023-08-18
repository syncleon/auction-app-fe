import React from 'react';
import AddVehicleForm from "../components/AddVehicleForm";
import {Layout, Row} from "antd";
import HomeForm from "../components/HomeForm";
import {Container, Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";

const AddVehicle = () => {
    return (
        <Container maxWidth="xs">
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                  <AddVehicleForm/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddVehicle;