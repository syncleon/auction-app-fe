import React, { useEffect, useState } from 'react';
import { Auction } from '../models/IAuction';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { apiInstance } from '../axios-instance';
import {
    Grid,
} from '@mui/material';
import {Vehicle} from "../models/IVehicle";
import AuctionsGrid from "./AuctionsGrid";
import VehiclesGrid from "./VehiclesGrid";

const HomeForm: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const history = useHistory();

    useEffect(() => {
        const intervalId = setInterval(fetchAuctions, 1000);

        return () => clearInterval(intervalId);
    }, []);

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

    const handleClickOnImage = (auctionId: number) => {
        history.push(RouteNames.VEHICLE_DETAILS.replace(':id', String(auctionId)));
    };

    const calculateTimeLeft = (endTime: number): string => {
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;

        const seconds = Math.floor((remainingTime / 1000) % 60);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        if (days > 1) {
            return `${days} days`;
        } else if (days === 1) {
            return `${days} day`;
        } else if (hours > 0) {
            return `${hours}:${displayMinutes}:${displaySeconds}`;
        } else {
            return `${displayMinutes}:${displaySeconds}`;
        }
    };

    const fetchAuctions = () => {
        apiInstance
            .get('auctions')
            .then((response) => {
                const auctionsData: Auction[] = response.data.filter(
                    (auction: Auction) => !isAuctionEnded(Number(auction.endTime))
                );
                setAuctions(auctionsData);
            })
            .catch((error) => {
                console.error('Error fetching auctions:', error);
            });
    };

    const isAuctionEnded = (endTime: number): boolean => {
        const currentTime = new Date().getTime();
        return endTime < currentTime;
    };

    return (
        <React.Fragment>
            <div><h1>Auctions</h1></div>
            <Grid container spacing={2}>
                <AuctionsGrid
                    auctions={auctions}
                    calculateTimeLeft={calculateTimeLeft}
                    handleClickOnImage={handleClickOnImage}
                />
            </Grid>
            <div><h1>New Added</h1></div>
            <Grid container spacing={2}>
                <VehiclesGrid
                    vehicles={vehicles}
                    handleClickOnImage={handleClickOnImage}
                />
            </Grid>
        </React.Fragment>
    );
};

export default HomeForm;
