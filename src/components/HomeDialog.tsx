import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeDialog.css';
import { API_ENDPOINTS } from "../apiService";
import { RouteNames } from "../routes";
import ClockIcon from '../resources/clock.svg';
import { Item } from "../models/IItem";

const HomeDialog: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [featuredImages, setFeaturedImages] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctionItems = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.ITEMS);
                const fetchedItems: Item[] = await response.json();
                setItems(fetchedItems);
                const imagePromises = fetchedItems.map(async ({ id }) => {
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
        fetchAuctionItems();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.auction && item.auction.auctionStatus === 'STARTED' && item.auction.endTime <= Date.now()) {
                        return { ...item, auction: { ...item.auction, auctionStatus: 'CLOSED' } };
                    }
                    return item;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const calculateTimeLeft = (endTime?: number): string => {
        if (!endTime) return 'Ended'; // Handle undefined/null endTime safely

        const difference = endTime - Date.now();
        if (difference <= 0) return 'Ended';

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${hours}h ${minutes}m ${seconds}s`;
    };


    // Handle image click to navigate to the item details
    const handleImageClick = (itemId: string) => {
        navigate(RouteNames.ITEM_DETAILS.replace(':id', itemId));
    };

    // Get the full URL for the featured image
    const getFeaturedImageUrl = (itemId: string, filename: string): string => {
        return filename ? `${API_ENDPOINTS.ITEMS}/${itemId}/images/featured/${filename}` : 'path/to/placeholder/image.png'; // Fallback if no image
    };

    const filteredItemsByAuctionStarted = items.filter(item => item.auction?.auctionStatus === 'STARTED');

    return (
        <div className="home-dialog">
            <div className="auction-section">
                <h2>Auctions</h2>
                <div className="grid-container">
                    {filteredItemsByAuctionStarted.map((item) => (
                        <div key={item.id} className="auction-item">
                            <div className="image-wrapper" onClick={() => handleImageClick(item.id)}>
                                <img
                                    src={getFeaturedImageUrl(item.id, featuredImages[item.id] || '')}
                                    alt={`${item.year} ${item.make} ${item.model}`}
                                    onError={(e) => (e.target as HTMLImageElement).src = 'path/to/placeholder/image.png'} // Handle missing image
                                />
                                <div className={`badge active`}>
                                    <img src={ClockIcon} alt="Clock Icon" className="clock-icon"/>
                                    {calculateTimeLeft(item.auction?.endTime)}
                                </div>
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
        </div>
    );
};

export default HomeDialog;
