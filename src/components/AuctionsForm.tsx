import React, { useEffect, useState } from 'react';
import { Auction } from '../models/IAuction';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { apiInstance } from '../axios-instance';
import {
    Button,
    Card,
    CardContent,
    CardMedia, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid, TextField,
    Typography,
} from '@mui/material';
import {Vehicle} from "../models/IVehicle";
import {message} from "antd";

const AuctionsForm: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [openBidDialog, setOpenBidDialog] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [selectedAuctionId, setSelectedAuctionId] = useState<number | null>(null);
    const history = useHistory();

    const handleClickOnImage = (auctionId: number) => {
        history.push(RouteNames.AUCTION_DETAILS.replace(':id', String(auctionId)));
    };

    const handleOpenBidDialog = (auctionId: number) => {
        setSelectedAuctionId(auctionId);
        setOpenBidDialog(true);
    };

    const handleCloseBidDialog = () => {
        setOpenBidDialog(false);
        setBidAmount('');
        setSelectedAuctionId(null);
    };

    const handleBidAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBidAmount(event.target.value);
    };

    const handleBidSubmit = async () => {
        const payloadData = {
            auctionId: selectedAuctionId,
            bidValue: bidAmount
        };
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            // Await the API call
            await apiInstance.post('bids', payloadData, {headers});
            message.success("Bid created successfully.");
        } catch (error) {
            console.error('Error creating bid:', error);
            message.error(`Error creating bid: ${error}`); // Use backticks for string interpolation
        }
        handleCloseBidDialog();
    };

    const calculateTimeLeft = (endTime: number): string => {
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            return 'Auction ended';
        }

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
        const intervalId = setInterval(fetchAuctions, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const isCurrentUserSeller = (vehicle: Vehicle): boolean => {
        // Assuming you have access to the current user's ID
        const currentUser = localStorage.getItem('username')
        return vehicle.sellerUsername == currentUser;
    };

    return (
        <Grid container spacing={2}>
            {auctions
                .filter((auction) => !auction.vehicle.deleted)
                .map((auction, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Card
                            sx={{
                                maxWidth: 500,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="div"  // Use a div instead of img
                                sx={{
                                    position: 'relative',
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    onClick={() => handleClickOnImage(auction.id)}
                                    alt={`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
                                    src={`http://localhost:8080/api/v1/vehicles/display/${auction.vehicle.id}/${auction.vehicle.images[0]}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 10,
                                        width: '50%',
                                        height: '10%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Adjust the opacity as needed
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#fff',  // Text color
                                        padding: '1px',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <Typography variant="subtitle2" component="div">
                                        ⏱ {calculateTimeLeft(Number(auction.endTime))} Bid ${auction.currentMaxBid}
                                    </Typography>
                                </div>
                            </CardMedia>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h6">
                                    {`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Owner: {auction.auctionOwner}
                                </Typography>
                                {!isCurrentUserSeller(auction.vehicle) && (
                                    <Button onClick={() => handleOpenBidDialog(auction.id)}>Make Bid</Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            <Dialog open={openBidDialog} onClose={handleCloseBidDialog}>
                <DialogTitle>Place Bid</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bidAmount"
                        label="Bid Amount"
                        type="number"
                        fullWidth
                        value={bidAmount}
                        onChange={handleBidAmountChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBidDialog}>Cancel</Button>
                    <Button onClick={handleBidSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    );
};

export default AuctionsForm;
