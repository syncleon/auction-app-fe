import React, { useEffect, useState } from 'react';
import { Auction } from "../models/IAuction";
import { API_ENDPOINTS } from "../apiService";

const PastAuctionsDialog: React.FC = () => {
    const [pastAuctions, setPastAuctions] = useState<Auction[]>([]);
    const [featuredImages, setFeaturedImages] = useState<{ [key: string]: string }>({});

    const getFeaturedImageUrl = (itemId: string, filename: string): string => {
        return `${API_ENDPOINTS.ITEMS}/${itemId}/images/featured/${filename}`;
    };

    useEffect(() => {
        const fetchPastAuctions = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.AUCTIONS);
                const auctions: Auction[] = await response.json();

                const closedAuctions = auctions.filter(auction => auction.auctionStatus === 'CLOSED');
                setPastAuctions(closedAuctions);

                await Promise.all(
                    closedAuctions.map(async ({ item }) => {
                        const filenameResponse = await fetch(`${API_ENDPOINTS.ITEMS}/${item.id}/images/featured`);
                        if (filenameResponse.ok) {
                            const filenames: string[] = await filenameResponse.json();
                            if (filenames.length > 0) {
                                setFeaturedImages(prev => ({ ...prev, [item.id]: filenames[0] }));
                            }
                        }
                    })
                );
            } catch (error) {
                console.error('Error fetching auction items:', error);
            }
        };

        fetchPastAuctions();
    }, []);

    return (
        <div className="past-auction-section">
            <h2>Past Results</h2>
            <div className="grid-container">
                {pastAuctions.map(({ item }) => (
                    <div key={item.id} className="auction-item">
                        <div className="image-wrapper">
                            <img
                                src={featuredImages[item.id] ? getFeaturedImageUrl(item.id, featuredImages[item.id]) : ''}
                                alt={`${item.year} ${item.make} ${item.model}`}
                            />
                            <div className={`badge ended`}>Ended</div>
                        </div>
                        <h3>{item.year} {item.make} {item.model}</h3>
                        <p>
                            {item.mileage} km,&nbsp;
                            {item.isSold ? 'Sold' : 'Available'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PastAuctionsDialog;
