import React, {FC, useState} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";

const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('' )
    const {login} = useActions()
    const history = useHistory()


    const submit = () => {
        login(username,password)
    }

    const handleRegisterClick = () => {
        history.push(RouteNames.REGISTER);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={submit}
            onFinishFailed={() => error}
            autoComplete="off"
        >
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required("Please input username!")]}
            >
                <Input value={username} onChange={e => SetUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please input password!")]}
            >
                <Input.Password value={password} onChange={e => SetPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                No account?
                <Button type="link" onClick={handleRegisterClick}>
                Register
            </Button>
            </Form.Item>
        </Form>
    )
};

export default LoginForm;