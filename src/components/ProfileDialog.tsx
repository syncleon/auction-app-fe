import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDialog.css';
import { Item } from "../models/IItem";
import { API_ENDPOINTS } from "../apiService";
import { RouteNames } from "../routes";

const ProfileDialog = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [featuredImages, setFeaturedImages] = useState<{ [key: string]: string }>({});
    const [showDialog, setShowDialog] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [reservePrice, setReservePrice] = useState<number | "">("");
    const [duration, setDuration] = useState<string>("MINUTE");
    const navigate = useNavigate();

    const AuctionDuration = ["MINUTE", "DAY", "WEEK", "TWO_WEEKS", "MONTH"];

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchItems = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.CURRENT_USER_ITEMS, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data: Item[] = await response.json();
                setItems(data);

                await Promise.all(data.map(async (item) => {
                    const filenameResponse = await fetch(`${API_ENDPOINTS.ITEMS}/${item.id}/images/featured`);
                    if (filenameResponse.ok) {
                        const filenames: string[] = await filenameResponse.json();
                        if (filenames.length > 0) {
                            setFeaturedImages(prev => ({ ...prev, [item.id]: filenames[0] }));
                        }
                    }
                }));
            } catch (error) {
                console.error('Error fetching items or featured images:', error);
            }
        };

        fetchItems();
    }, []);

    const handleImageClick = (itemId: string) => {
        navigate(RouteNames.ITEM_DETAILS.replace(':id', itemId));
    };

    const getFeaturedImageUrl = (itemId: string, filename: string) => {
        return `${API_ENDPOINTS.ITEMS}/${itemId}/images/featured/${filename}`;
    };

    const handleAddToAuction = (itemId: string) => {
        setSelectedItemId(itemId);
        setShowDialog(true);
    };

    const handleCreateListing = async () => {
        if (!selectedItemId || reservePrice <= 0 || !duration) {
            alert("Please fill all fields correctly.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(API_ENDPOINTS.AUCTIONS, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    itemId: selectedItemId,
                    reservePrice: reservePrice,
                    duration: duration
                })
            });

            if (response.ok) {
                alert("Auction listing created successfully!");
                setShowDialog(false);
                setReservePrice("");
                setDuration("MINUTE");
            } else {
                const errorData = await response.json();
                console.error("Error creating auction listing:", errorData);
                alert("Failed to create auction listing.");
            }
        } catch (error) {
            console.error("Error creating auction listing:", error);
            alert("An error occurred while creating the listing.");
        }
    };

    return (
        <div className="profile-dialog">
            <div className="vehicle-section">
                <h2>Your vehicles</h2>
                <div className="grid-container">
                    {items.map(item => (
                        <div key={item.id} className="auction-item">
                            <div className="image-wrapper" onClick={() => handleImageClick(item.id)}>
                                <img
                                    src={featuredImages[item.id] ? getFeaturedImageUrl(item.id, featuredImages[item.id]) : ''}
                                    alt={`${item.year} ${item.make} ${item.model}`}
                                />
                            </div>
                            <h3>{item.year} {item.make} {item.model}</h3>
                            <p>
                                {item.mileage} km,&nbsp;
                                {item.onAuction ? 'On Auction' : 'Not on Auction'},&nbsp;
                                {item.isSold ? 'Sold' : 'Available'}
                            </p>
                            <button onClick={() => handleAddToAuction(item.id)}>Add to Auction</button>
                        </div>
                    ))}

                    {showDialog && (
                        <div className="dialog-overlay">
                            <div className="dialog">
                                <h3>Create Auction Listing</h3>
                                <label>
                                    Reserve Price:
                                    <input
                                        type="number"
                                        min="1"
                                        value={reservePrice}
                                        onChange={(e) => setReservePrice(Number(e.target.value) || "")}
                                    />
                                </label>
                                <label>
                                    Duration:
                                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                        {AuctionDuration.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </label>
                                <div className="dialog-buttons">
                                    <button onClick={handleCreateListing}>Create Listing</button>
                                    <button onClick={() => setShowDialog(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProfileDialog;
