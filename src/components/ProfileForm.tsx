import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Vehicle } from '../models/IVehicle';
import { RouteNames } from '../routes';
import {User} from "../models/IUser";


const ProfileForm: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [user, setUser] = useState<User | null>(null)
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState<number>(0);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/v1/users/current', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setVehicles(response.data.vehicles);
                setUser(response.data.user)
            })
            .catch((error) => {
                console.error('Error fetching vehicles data:', error);
            });
    }, []);

    const handleClickOnImage = (vehicleId: number) => {
        history.push(RouteNames.VEHICLE_DETAILS.replace(':id', String(vehicleId)));
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab label="User Details" />
                <Tab label="User Vehicles" />
                <Tab label="Settings" />
            </Tabs>

            {selectedTab === 0 && (
                <div>
                    <Typography variant="h5">User Details</Typography>
                    {user ? (
                        <>
                            <Typography variant="body1">Username: {user.username}</Typography>
                            <Typography variant="body1">Email: {user.email}</Typography>
                        </>
                    ) : (
                        <Typography variant="body1">Loading user details...</Typography>
                    )}
                </div>
            )}

            {selectedTab === 1 && (
                <Grid container spacing={3}>
                    {vehicles.map((vehicle) => (
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
                                    <Typography variant="h6">
                                        {vehicle.make} {vehicle.model}
                                    </Typography>
                                    <Typography variant="body2">Year: {vehicle.year}</Typography>
                                    <Typography variant="body2">Mileage: {vehicle.mileage}</Typography>
                                    <Typography variant="body2">Expected Bid: {vehicle.expectedBid}</Typography>
                                    <Typography variant="body2">Seller: {vehicle.sellerUsername}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {selectedTab === 2 && (
                <div>{/* Settings Tab Content */}</div>
            )}
        </>
    );
};

export default ProfileForm;
