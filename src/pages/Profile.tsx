import React, {FC} from 'react';
import {Layout, Row} from "antd";
import ProfileForm from "../components/ProfileForm";

const Profile:FC = () => {
    return (
        <Layout>
            <Row justify="center" align="top" className="h100">
                <ProfileForm/>
            </Row>
        </Layout>
    );
};

export default Profile;