import React, {FC, useState} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";

const RegisterForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, SetUsername] = useState('')
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const {register} = useActions()
    const history = useHistory()


    const submit = () => {
        register(username,email,password)
    }

    const handleLoginClick = () => {
        history.push(RouteNames.LOGIN);
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
                label="Email"
                name="email"
                rules={[rules.required("Please input email!")]}
            >
                <Input value={username} onChange={e => SetEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please input password!")]}
            >
                <Input.Password value={password} onChange={e => SetPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Register
                </Button>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 30,
                }}
            >
                Have account?
                <Button type="link" onClick={handleLoginClick}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
};

export default RegisterForm;