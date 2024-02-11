import React, { useState } from 'react';
import {
    Button,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {Auction} from "../models/IAuction";
import {Vehicle} from "../models/IVehicle";
import {RouteNames} from "../routes";
import {apiInstance} from "../axios-instance";
import {message} from "antd";
import {useHistory} from "react-router-dom";

interface AuctionsGridProps {
    auctions: Auction[];
    handleClickOnImage: (auctionId: number) => void;
    calculateTimeLeft: (endTime: number) => string;
}

const isAuctionEnded = (endTime: number): boolean => {
    const currentTime = new Date().getTime();
    return endTime < currentTime;
};

const AuctionsGrid: React.FC<AuctionsGridProps> =
    ({
         auctions,
         handleClickOnImage,
         calculateTimeLeft
     }) => {
        const [openBidValue, setOpenBidValue] = useState('');
        const [openBidDialog, setOpenBidDialog] = useState(false);
        const [bidAmount, setBidAmount] = useState('');
        const [selectedAuctionId, setSelectedAuctionId] = useState<number | null>(null);
        const history = useHistory();

        const handleBidValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setOpenBidValue(event.target.value);
        };

        const handleOpenBidDialog = (auctionId: number) => {
            const isAuthenticated = localStorage.getItem('token') !== null;

            if (isAuthenticated) {
                setSelectedAuctionId(auctionId);
                setOpenBidDialog(true);
            } else {
                history.push(RouteNames.LOGIN);
            }
        };

        const handleCloseBidDialog = () => {
            setOpenBidDialog(false);
            setBidAmount('');
            setSelectedAuctionId(null);
        };

        const handleBidAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setBidAmount(event.target.value);
        };

        const isCurrentUserSeller = (vehicle: Vehicle): boolean => {
            const currentUser = localStorage.getItem('username')
            return vehicle.sellerUsername == currentUser;
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
                console.error('Error creating bid:', (error as any).response.data);
                message.error(`Error creating bid: ${(error as any).response.data}`); // Use backticks for string interpolation
            }
            handleCloseBidDialog();
        };

        const handleOpenDialog = (auctionId: number) => {
            handleOpenBidDialog(auctionId);
            setOpenBidDialog(true);
        };

        const handleCloseDialog = () => {
            setOpenBidDialog(false);
            setOpenBidValue('');
        };

        return (
            <React.Fragment>
                {auctions.map((auction, index) => (
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
                                component="div"
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
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#fff',
                                        padding: '1px',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <Typography variant="subtitle2" component="div">
                                        ⏱ {calculateTimeLeft(Number(auction.endTime))} Bid ${auction.currentMaxBid}
                                    </Typography>
                                </div>
                            </CardMedia>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography variant="h6">
                                    {`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Owner: {auction.auctionOwner}
                                </Typography>
                                {auction.auctionStatus === 'STARTED' && !isAuctionEnded(Number(auction.endTime)) && !isCurrentUserSeller(auction.vehicle) && (
                                    <Button onClick={() => handleOpenDialog(auction.id)}>Place Bid</Button>
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
            </React.Fragment>
        );
    };

export default AuctionsGrid;
