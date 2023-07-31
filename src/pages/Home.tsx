import React, {FC} from 'react';
import {Layout, Row} from "antd";
import HomeForm from "../components/HomeForm";

const Home:FC = () => {
    return (
        <Layout>
            <Row justify="center" align="top" className="h100">
                <HomeForm/>
            </Row>
        </Layout>
    );
}

export default Home;