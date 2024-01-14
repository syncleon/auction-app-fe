import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios/index';
import { Vehicle } from '../models/IVehicle';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {apiInstance} from "../axios-instance";

const VehicleDetailsForm = () => {
    const { id }: { id: string } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        apiInstance
            .get(`vehicles/${id}`)
            .then((response) => {
                setVehicle(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vehicle data:', error);
            });
    }, [id]);

    return (
        <div>
            {vehicle ? (
                <div>
                    <h2>{vehicle.make} {vehicle.model}</h2>
                    <p>Year: {vehicle.year}</p>
                    <p>Mileage: {vehicle.mileage}</p>
                    <p>VIN: {vehicle.vin}</p>
                    <p>Expected Bid: {vehicle.expectedBid}</p>
                    <p>Damaged: {vehicle.damaged ? 'Yes' : 'No'}</p>
                    <p>Seller: {vehicle.sellerUsername}</p>
                    <p>OnSale: {vehicle.onSale}</p>
                    <h3>Images:</h3>
                    <div>
                        {vehicle.images.map((image, index) => (
                            <img key={index}
                                 src={`http://localhost:8080/api/v1/vehicles/display/${vehicle.id}/${image}`}
                                 alt={`Vehicle ${index + 1}`} />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading vehicle details...</p>
            )}
        </div>
    );
};

export default VehicleDetailsForm;
