import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { Vehicle } from '../models/IVehicle';
import { apiInstance } from '../axios-instance';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const HomeForm: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const history = useHistory();

    const handleClickOnImage = (vehicleId: number) => {
        history.push(RouteNames.VEHICLE_DETAILS.replace(':id', String(vehicleId)));
    };

    useEffect(() => {
        apiInstance
            .get('vehicles')
            .then((response) => {
                const vehiclesData: Vehicle[] = response.data;
                setVehicles(vehiclesData);
            })
            .catch((error) => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {vehicles
                .filter((vehicle) => !vehicle.deleted)
                .map((vehicle, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Card
                            onClick={() => handleClickOnImage(vehicle.id)}
                            sx={{ maxWidth: 768, maxHeight: 412, height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                height="300"
                                image={`http://localhost:8080/api/v1/vehicles/display/${vehicle.id}/${vehicle.images[0]}`}
                            />
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h6">
                                    {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default HomeForm;
