import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from "../apiService";
import { Item } from "../models/IItem";

const PastAuctionsDialog: React.FC = () => {
    const [itemsClosedAuctions, setItemsClosedAuctions] = useState<Item[]>([]);
    const [featuredImages, setFeaturedImages] = useState<{ [key: string]: string }>({});

    // Get the full URL for the featured image
    const getFeaturedImageUrl = (itemId: string, filename: string): string => {
        return filename ? `${API_ENDPOINTS.ITEMS}/${itemId}/images/featured/${filename}` : 'path/to/placeholder/image.png';
    };

    useEffect(() => {
        const fetchPastAuctions = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.ITEMS);
                const items: Item[] = await response.json();

                // Filter items with closed auctions
                const closedAuctions = items.filter(item => item.auction?.auctionStatus === 'CLOSED');
                setItemsClosedAuctions(closedAuctions);

                // Fetch featured images for closed auctions
                const imagePromises = closedAuctions.map(async ({ id }) => {
                    const filenameResponse = await fetch(`${API_ENDPOINTS.ITEMS}/${id}/images/featured`);
                    if (filenameResponse.ok) {
                        const filenames: string[] = await filenameResponse.json();
                        if (filenames.length > 0) {
                            return { id, filename: filenames[0] };
                        }
                    }
                    return { id, filename: '' };
                });

                const images = await Promise.all(imagePromises);
                const imageMap = images.reduce((acc, { id, filename }) => {
                    acc[id] = filename;
                    return acc;
                }, {} as { [key: string]: string });

                setFeaturedImages(imageMap);
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
                {itemsClosedAuctions.map((item) => (
                    <div key={item.id} className="auction-item">
                        <div className="image-wrapper">
                            <img
                                src={getFeaturedImageUrl(item.id, featuredImages[item.id] || '')}
                                alt={`${item.year} ${item.make} ${item.model}`}
                                onError={(e) => (e.target as HTMLImageElement).src = 'path/to/placeholder/image.png'} // Fallback image
                            />
                            <div className="badge ended">Ended</div>
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
