import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';

interface Vehicle {
    // Define the properties of the Vehicle interface here
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

const HomeForm = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/vehicles/all')
            .then((response) => {
                const vehiclesData: Vehicle[] = response.data;
                setVehicles(vehiclesData);
            })
            .catch((error) => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);

    const chunkSize = 4;

    const chunkArray = (arr: Vehicle[], size: number) => {
        const chunks: Vehicle[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const vehicleChunks = chunkArray(vehicles, chunkSize);

    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            {vehicleChunks.map((chunk, index) => (
                <Row gutter={[16, 16]} key={index}>
                    {chunk.map((vehicle) => (
                        <Col key={vehicle.id} span={24 / chunkSize}>
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
            ))}
        </div>
    );
};

export default HomeForm;
