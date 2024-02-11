import React, { useEffect, useState } from 'react';
import { Auction } from '../models/IAuction';
import { apiInstance } from '../axios-instance';
import { Grid } from '@mui/material';
import AuctionsGrid from './AuctionsGrid';

const PastAuctionsForm: React.FC = () => {
    const [endedAuctions, setEndedAuctions] = useState<Auction[]>([]);

    useEffect(() => {
        fetchEndedAuctions();
    }, []);

    const fetchEndedAuctions = () => {
        apiInstance
            .get('auctions')
            .then((response) => {
                const auctionsData: Auction[] = response.data.filter(
                    (auction: Auction) => isAuctionEnded(Number(auction.endTime))
                );
                setEndedAuctions(auctionsData);
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
        <Grid container spacing={2}>
            <AuctionsGrid
                auctions={endedAuctions}
                handleClickOnImage={(auctionId: number) => {}}
                calculateTimeLeft={(endTime: number) => ''}
            />
        </Grid>
    );
};

export default PastAuctionsForm;