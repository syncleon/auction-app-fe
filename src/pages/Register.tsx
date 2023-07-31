import React, {FC} from 'react';
import {Layout, Row} from "antd";
import RegisterForm from "../components/RegisterForm";

const Register:FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <RegisterForm/>
            </Row>
        </Layout>
    );
};

export default Register;