import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import {Vehicle} from "../models/IVehicle";

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
        <div style={{ width: '90%', margin: '0 auto' }}>
            {vehicleChunks.map((chunk, index) => (
                <Row gutter={[16, 16]} key={index}>
                    {chunk.map((vehicle) => (
                        <Col key={vehicle.id} span={24 / chunkSize}>
                            <div style={{ padding: 16, border: '1px solid #ccc' }}>
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={`http://localhost:63958/${vehicle.images[0]}`}
                                        alt={vehicle.make}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <p style={{ fontWeight: 'bold' }}>
                                    {vehicle.year}, {vehicle.make}, {vehicle.model}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default HomeForm;
