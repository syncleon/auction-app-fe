import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Col, Row} from "antd";

interface Vehicle {
    id: number;
    producer: string;
    model: string;
    mileage: number;
    vin: string;
    year: string;
    engine: string;
    drivetrain: string;
    transmission: string;
    bodyStyle: string;
    exteriorColor: string;
    interiorColor: string;
    sellerType: string;
    highlights: string;
    expectedBid: number;
    damaged: boolean;
    sellerId: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    vehicles: Vehicle[];
}

const ProfileForm = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        axios.get('http://localhost:8080/api/v1/users/current', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                const { id, username, email, vehicles } = response.data;
                setCurrentUser({
                    id,
                    username,
                    email,
                    vehicles
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <label>ID: </label>
                <span>{currentUser.id}</span>
            </div>
            <div>
                <label>Name: </label>
                <span>{currentUser.username}</span>
            </div>
            <div>
                <label>Email: </label>
                <span>{currentUser.email}</span>
            </div>
            <div>

                <Row gutter={[16, 16]}>
                    {currentUser.vehicles.map((vehicle) => (
                        <Col key={vehicle.id}>
                            {/* Automatically adjust column size to fit content */}
                            <div style={{ padding: 16, border: '1px solid #ccc' }}>
                                <p>make: {vehicle.producer}</p>
                                <p>model: {vehicle.model}</p>
                                <p>vin: {vehicle.vin}</p>
                                <p>mileage: {vehicle.mileage}</p>
                                <p>year: {vehicle.year}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProfileForm;
