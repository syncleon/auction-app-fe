import React from 'react';
import {Layout, Row} from "antd";
import RegisterForm from "../components/RegisterForm";
import VehicleDetailsForm from "../components/VehicleDetailsForm";

const VehicleDetails = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <VehicleDetailsForm/>
            </Row>
        </Layout>
    );
};

export default VehicleDetails;