import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { Vehicle } from '../models/IVehicle';
import { apiInstance } from '../axios-instance';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const HomeForm: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const history = useHistory();

    const handleClickOnImage = (vehicleId: number) => {
        history.push(RouteNames.VEHICLE_DETAILS.replace(':id', String(vehicleId)));
    };

    useEffect(() => {
        apiInstance
            .get<Vehicle[]>('vehicles')
            .then((response) => {
                const vehiclesData: Vehicle[] = response.data;
                setVehicles(vehiclesData);
            })
            .catch((error) => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);

    const isCurrentUserSeller = (vehicle: Vehicle): boolean => {
        // Assuming you have access to the current user's ID
        const currentUser = localStorage.getItem('username')
        return vehicle.sellerUsername !== currentUser;
    };

    return (
        <Grid container spacing={2}>
            {vehicles
                .filter((vehicle) => !vehicle.deleted)
                .map((vehicle, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Card
                            onClick={() => handleClickOnImage(vehicle.id)}
                            sx={{
                                maxWidth: 500,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                height="100%"
                                image={`http://localhost:8080/api/v1/vehicles/display/${vehicle.id}/${vehicle.images[0]}`}
                            />
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h6">
                                    {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Owner: {vehicle.sellerUsername}
                                </Typography>
                                {vehicle.onSale && isCurrentUserSeller(vehicle) && (
                                    <Button variant="contained" color="primary">
                                        Make Bid
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default HomeForm;
