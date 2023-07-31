import React, { useState } from 'react';
import {Form, Input, InputNumber, Select, Switch, Button, message} from 'antd';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";

const { Option } = Select;

const AddVehicleForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // Hook for performing redirects

    const handleSubmit = async () => {
        try {
            const formData = await form.validateFields();
            setLoading(true);

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            await axios.post('http://localhost:8080/api/v1/vehicles', formData, { headers });

            setLoading(false);
            message.success('Car vehicle created successfully'); // Display success notification
            history.push(RouteNames.PROFILE); // Redirect to "/profile"
        } catch (error) {
            console.log('Form validation error:', error);
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '70%' }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Producer" name="producer" rules={[{ required: true, message: 'Please enter the producer' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Please enter the model' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Mileage" name="mileage" rules={[{ required: true, message: 'Please enter the mileage' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="VIN" name="vin" rules={[{ required: true, message: 'Please enter the VIN' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please enter the year' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Engine" name="engine" rules={[{ required: true, message: 'Please enter the engine' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Drivetrain"
                name="drivetrain"
                rules={[{ required: true, message: 'Please enter the drivetrain' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Transmission"
                name="transmission"
                rules={[{ required: true, message: 'Please enter the transmission' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Body Style" name="bodyStyle" rules={[{ required: true, message: 'Please enter the body style' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Exterior Color"
                name="exteriorColor"
                rules={[{ required: true, message: 'Please enter the exterior color' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Interior Color"
                name="interiorColor"
                rules={[{ required: true, message: 'Please enter the interior color' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Seller Type" name="sellerType" rules={[{ required: true, message: 'Please enter the seller type' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Highlights" name="highlights" rules={[{ required: true, message: 'Please enter the highlights' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="Expected Bid"
                name="expectedBid"
                rules={[{ required: true, message: 'Please enter the expected bid' }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item label="Damaged" name="damaged" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Add Vehicle
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default AddVehicleForm;
