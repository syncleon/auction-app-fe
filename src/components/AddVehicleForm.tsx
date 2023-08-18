import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, message, Select, Switch} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {RouteNames} from '../routes';

const AddVehicleForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const history = useHistory();
    const [selectedMake, setSelectedMake] = useState("");
    const [availableModels, setAvailableModels] = useState<string[]>([]);


    const vehicleMakes = [
        "Toyota",
        "Honda",
        "Ford",
        "Chevrolet",
        "Nissan",
        "BMW",
        "Mercedes-Benz",
        "Audi", "" +
        "Volkswagen"];

    const handleMakeChange = (make: string) => {
        setSelectedMake(make);
        const simulatedModels = ["Model 1",
            "Model 2",
            "Model 3"];
        setAvailableModels(simulatedModels);
    };
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => (currentYear - index).toString());

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
            setSelectedImages(files);
            setPreviewUrls(previewUrls);
        }
    };

    const handleSubmit = async (formData: any) => {
        if (!selectedImages || selectedImages.length === 0) {
            message.error('Please select at least one image.');
            return;
        }
        const localFilePaths = Array.from(selectedImages!).map((file) => {
            return file.name;
        });
        try {
            setLoading(true);
            const requestData = {
                make: formData.make,
                model: formData.model,
                mileage: formData.mileage,
                year: formData.year,
                vin: formData.vin,
                expectedBid: formData.expectedBid,
                damaged: formData.damaged,
                images: localFilePaths,
            };

            console.log(requestData)

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.post('http://localhost:8080/api/v1/vehicles', requestData, {headers});

            setLoading(false);
            message.success('Car vehicle created successfully');
            history.push(RouteNames.PROFILE);
        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
        }
    };

    return (
        <div style={{width: '70%'}}>
            <Form form={form} layout="horizontal" onFinish={handleSubmit} size="small">
                <Form.Item
                    label="Make"
                    name="make"
                    rules={[{ required: true, message: 'Please select the make' }]}
                >
                    <Select
                        placeholder="Select a make"
                        onChange={handleMakeChange}
                        value={selectedMake}
                    >
                        {vehicleMakes.map((make) => (
                            <Select.Option key={make} value={make}>
                                {make}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Model"
                    name="model"
                    rules={[{ required: true, message: 'Please enter the model' }]}
                >
                    <Select
                        placeholder="Select a model"
                        disabled={!selectedMake}
                    >
                        {availableModels.map((model) => (
                            <Select.Option key={model} value={model}>
                                {model}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please select the year' }]}>
                    <Select placeholder="Select a year">
                        {years.map((year) => (
                            <Select.Option key={year} value={year}>
                                {year}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="VIN" name="vin" rules={[{ required: true, message: 'Please enter the VIN' }]}>
                    <Input style={{ textTransform: 'uppercase' }} maxLength={17} />
                </Form.Item>
                <Form.Item
                    label="Mileage"
                    name="mileage"
                    rules={[{required: true, message: 'Please enter mileage'}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label="Expected Bid"
                    name="expectedBid"
                    rules={[{required: true, message: 'Please enter the expected bid'}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Damaged" name="damaged" valuePropName="checked">
                    <Switch/>
                </Form.Item>
                <Form.Item>
                    <label htmlFor="imageInput">Select images from your PC:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        required
                    />
                    <br/>
                    {previewUrls.length > 0 ? (
                        <div>
                            <h3>Selected Image Previews:</h3>
                            {previewUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Selected ${index + 1}`} style={{maxWidth: '300px'}}/>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'red' }}>Please select at least one image.</p>
                    )}
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
