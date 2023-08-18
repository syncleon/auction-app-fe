import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {RouteNames} from "../routes";
import {Vehicle} from "../models/IVehicle";
import axios from "axios";

const HomeForm = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const history = useHistory();

    const handleClickOnImage = (vehicleId: number) => {
        history.push(RouteNames.VEHICLE_DETAILS.replace(':id', String(vehicleId)));
    };

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

    return (
        <Grid container spacing={3}>
            {vehicles.map(vehicle => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt={`${vehicle.make} ${vehicle.model}`}
                            height="200"
                            image={`http://localhost:63958/${vehicle.images[0]}`}
                            onClick={() => handleClickOnImage(vehicle.id)}
                        />
                        <CardContent>
                            <Typography variant="h6">{vehicle.make} {vehicle.model}</Typography>
                            <Typography variant="body2">Year: {vehicle.year}</Typography>
                            <Typography variant="body2">Mileage: {vehicle.mileage}</Typography>
                            <Typography variant="body2">Expected Bid: {vehicle.expectedBid}</Typography>
                            <Typography variant="body2">Seller: {vehicle.sellerUsername}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default HomeForm;
