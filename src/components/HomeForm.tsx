import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { RouteNames } from '../routes';
import { Vehicle } from '../models/IVehicle';
import { apiInstance} from '../axios-instance';

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
        <Grid container spacing={3}>
            {vehicles
                .filter((vehicle) => !vehicle.deleted)
                .map((vehicle, index) => {
                    const imageUrl = `http://localhost:8080/api/v1/vehicles/preview/${vehicle.images[0]}`;

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={vehicle.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={`${vehicle.make} ${vehicle.model}`}
                                    width="100%"
                                    src={imageUrl}
                                    onClick={() => handleClickOnImage(vehicle.id)}
                                    style={{ objectFit: 'contain' }}
                                    onError={(e) => {
                                        // Handle error if needed
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {vehicle.year}, {vehicle.make} {vehicle.model}
                                    </Typography>
                                    <Typography variant="body2">
                                        Owner: {vehicle.sellerUsername}
                                    </Typography>
                                    <Typography variant="body2">
                                        Expected Price: {vehicle.expectedBid} $
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default HomeForm;
