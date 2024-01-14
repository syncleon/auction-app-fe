import React, { useEffect, useState } from 'react';
import { Auction } from '../models/IAuction';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { apiInstance } from '../axios-instance';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';

const AuctionsForm: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const history = useHistory();

    const handleClickOnImage = (auctionId: number) => {
        history.push(RouteNames.AUCTION_DETAILS.replace(':id', String(auctionId)));
    };

    const calculateTimeLeft = (endTime: number): string => {
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            return 'Auction ended';
        }

        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m`;
    };

    const fetchAuctions = () => {
        apiInstance
            .get('auctions')
            .then((response) => {
                const auctionsData: Auction[] = response.data;
                setAuctions(auctionsData);
            })
            .catch((error) => {
                console.error('Error fetching auctions:', error);
            });
    };

    useEffect(() => {
        fetchAuctions();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(fetchAuctions, 30000); // Fetch every 30 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Grid container spacing={2}>
            {auctions
                .filter((auction) => auction.auctionStatus !== 'CREATED')
                .map((auction, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Card
                            onClick={() => handleClickOnImage(auction.id)}
                            sx={{
                                maxWidth: 500,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
                                height="100%"
                                image={`http://localhost:8080/api/v1/vehicles/display/${auction.vehicle.id}/${auction.vehicle.images[0]}`}
                                sx={{
                                    position: 'relative',
                                }}
                            >
                            </CardMedia>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h6">
                                    {`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Owner: {auction.auctionOwner}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Time Left: {calculateTimeLeft(Number(auction.endTime))}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Highest Bid: ${auction.currentMaxBid}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default AuctionsForm;
