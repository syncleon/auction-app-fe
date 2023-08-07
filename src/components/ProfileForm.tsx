import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col } from 'antd';
import axios from 'axios';
import { Vehicle } from '../models/IVehicle';

const { TabPane } = Tabs;

const ProfileForm = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/api/v1/vehicles', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setVehicles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vehicles data:', error);
            });
    }, []);

    return (
        <Tabs defaultActiveKey="user-vehicles" centered>
            <TabPane tab="User Details" key="user-details">
                {/* Render user details component */}
            </TabPane>
            <TabPane tab="User Vehicles" key="user-vehicles">
                <div>
                    <Row gutter={[15, 15]}>
                        {vehicles.map((vehicle) => (
                            <Col key={vehicle.id} xs={24} sm={12} md={8} lg={6}>

                                <div style={{ border: '1px solid #ccc', padding: '16px' }}>
                                    <div>
                                        {vehicle.images.map((image, index) => (
                                            <img
                                                key={`image-${index}`}
                                                src={`http://localhost:63958/${image}`}
                                                alt={`Vehicle ${vehicle.id} - Image ${index + 1}`}
                                                style={{ width: '100%', maxWidth: '150px', height: 'auto', marginBottom: '10px' }}
                                            />
                                        ))}
                                    </div>
                                    <p>Make: {vehicle.make}</p>
                                    <p>Model: {vehicle.model}</p>
                                    <p>Mileage: {vehicle.mileage}</p>
                                    <p>VIN: {vehicle.vin}</p>
                                    <p>Year: {vehicle.year}</p>
                                    <p>Expected Bid: {vehicle.expectedBid}</p>
                                    <p>Is Damaged: {vehicle.damaged ? 'Yes' : 'No'}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="Settings" key="settings">
                {/* Render settings component */}
            </TabPane>
        </Tabs>
    );
};

export default ProfileForm;