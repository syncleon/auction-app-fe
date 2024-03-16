import React from 'react';
import { Vehicle } from '../models/IVehicle';
import { Typography, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';

interface VehicleGridProps {
    vehicles: Vehicle[];
    handleClickOnImage: (vehicleId: number) => void;
}

const VehiclesGrid: React.FC<VehicleGridProps> = ({ vehicles, handleClickOnImage }) => {
    // Filter vehicles that are on sale
    const vehiclesOnSale = vehicles.filter(vehicle => !vehicle.onSale && !vehicle.auctionAdded);

    return (
        <React.Fragment>
            <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
            {vehiclesOnSale.map((vehicle, index) => (
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
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </React.Fragment>
    );
};

export default VehiclesGrid;
