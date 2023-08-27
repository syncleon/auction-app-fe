import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { apiInstance } from '../axios-instance';
import { RouteNames } from '../routes';
import {User} from "../models/IUser";
import {Vehicle} from "../models/IVehicle";

interface ProfileFormProps {
    user?: User;
    vehicles: Vehicle[];
    onDeleteVehicle: (vehicleId: number) => void;
    onItemClick: (vehicleId: number) => void;
}

const VehicleListing: React.FC<ProfileFormProps> = ({ vehicles, onDeleteVehicle, onItemClick }) => (
    <Grid container spacing={2}>
        {vehicles.filter((vehicle) => !vehicle.deleted).map((vehicle) => (
            <Grid item xs={6} key={vehicle.id}>
                <VehicleCard vehicle={vehicle} onDeleteVehicle={onDeleteVehicle} onItemClick={onItemClick} />
            </Grid>
        ))}
    </Grid>
);

interface VehicleCardProps {
    vehicle: Vehicle;
    onDeleteVehicle: (vehicleId: number) => void;
    onItemClick: (vehicleId: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onDeleteVehicle, onItemClick }) => (
    <Card>
        <CardMedia
            component="img"
            alt={`${vehicle.make} ${vehicle.model}`}
            width="100%"
            image={`http://localhost:63958/${vehicle.images[0]}`}
            onClick={() => onItemClick(vehicle.id)}
            style={{ objectFit: 'contain' }}
        />
        <CardContent>
            <Typography variant="h6">
                {vehicle.make} {vehicle.model}
            </Typography>
            <Typography variant="body2">Year: {vehicle.year}</Typography>
            <Typography variant="body2">Mileage: {vehicle.mileage}</Typography>
            <Typography variant="body2">Expected Bid: {vehicle.expectedBid}</Typography>
            <Typography variant="body2">Seller: {vehicle.sellerUsername}</Typography>
            <button onClick={() => onDeleteVehicle(vehicle.id)} className="delete-button">
                Delete
            </button>
        </CardContent>
    </Card>
);

interface UserDetailsProps {
    user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => (
    <div className="centered-container">
        {user ? (
            <Card>
                <CardContent>
                    <Typography variant="body2">Username: {user.username}</Typography>
                    <Typography variant="body2">Email: {user.email}</Typography>
                </CardContent>
            </Card>
        ) : (
            <Typography variant="body1">Loading user details...</Typography>
        )}
    </div>
);

const SettingsTab: React.FC = () => (
    <div>{/* Settings Tab Content */}</div>
);

const ProfileForm: React.FC = () => {
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        apiInstance.get('users/current', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                const userData: User = {
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    vehicles: response.data.vehicles,
                };
                setUser(userData);
                setVehicles(userData.vehicles);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleDeleteVehicle = (vehicleId: number) => {
        const accessToken = localStorage.getItem('token');
        apiInstance.delete(`vehicles/${vehicleId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(() => {
                const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
                setVehicles(updatedVehicles);
            })
            .catch((error) => {
                console.error('Error deleting vehicle:', error);
            });
    };

    const handleClickOnImage = (vehicleId: number) => {
        history.push(RouteNames.VEHICLE_DETAILS.replace(':id', String(vehicleId)));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor="primary"
                >
                    <Tab label="Vehicle Listing" />
                    <Tab label="User Details" />
                    <Tab label="Settings" />
                </Tabs>
            </Grid>
            <Grid item xs={10}>
                {selectedTab === 0 && (
                    <VehicleListing vehicles={vehicles} onDeleteVehicle={handleDeleteVehicle} onItemClick={handleClickOnImage} />
                )}

                {selectedTab === 1 && (
                    <UserDetails user={user} />
                )}

                {selectedTab === 2 && (
                    <SettingsTab />
                )}
            </Grid>
        </Grid>
    );
};

export default ProfileForm;
