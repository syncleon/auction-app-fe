import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDialog.css';
import { Item } from "../models/IItem";
import { API_ENDPOINTS } from "../apiService";
import { RouteNames } from "../routes";

const AuctionDuration = ["MINUTE", "DAY", "WEEK", "TWO_WEEKS", "MONTH"];

const ProfileDialog = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [featuredImages, setFeaturedImages] = useState<{ [key: string]: string }>({});
    const [showDialog, setShowDialog] = useState(false);
    const [showRestartDialog, setShowRestartDialog] = useState(false);
    const [showStartConfirmation, setShowStartConfirmation] = useState(false); // New state for confirmation modal
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [reservePrice, setReservePrice] = useState<number | "">("");
    const [duration, setDuration] = useState<string>("MINUTE");
    const [activeTab, setActiveTab] = useState<string>("NOT_LISTED");
    const [auctionIdToRestart, setAuctionIdToRestart] = useState<string | null>(null);
    const [auctionIdToCancel, setAuctionIdToCancel] = useState<string | null>(null);
    const [auctionIdToStart, setAuctionIdToStart] = useState<string | null>(null); // Store auction ID for starting
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchItems = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.CURRENT_USER_ITEMS, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                const data: Item[] = await response.json();
                setItems(data);
                await loadFeaturedImages(data);
            } catch (error) {
                console.error('Error fetching items or featured images:', error);
            }
        };
        fetchItems();
    }, []); // Run once on component mount

    const loadFeaturedImages = async (data: Item[]) => {
        await Promise.all(
            data.map(async (item) => {
                const filenameResponse = await fetch(`${API_ENDPOINTS.ITEMS}/${item.id}/images/featured`);
                if (filenameResponse.ok) {
                    const filenames: string[] = await filenameResponse.json();
                    if (filenames.length > 0) {
                        setFeaturedImages(prev => ({ ...prev, [item.id]: filenames[0] }));
                    }
                }
            })
        );
    };

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
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ itemId: selectedItemId, reservePrice, duration }),
            });

            if (response.ok) {
                alert("Auction listing created successfully!");
                resetDialog();
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

    const resetDialog = () => {
        setShowDialog(false);
        setReservePrice("");
        setDuration("MINUTE");
    };

    const handleAuctionAction = async (auctionId: string | undefined, action: string) => { // Make this function async
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token is missing.");
            return;
        }

        let url = "";
        if (action === "start") {
            setAuctionIdToStart(auctionId || null);
            setShowStartConfirmation(true); // Show the confirmation modal
            return;
        } else if (action === "restart") {
            url = `${API_ENDPOINTS.AUCTIONS}/restart`;
        } else if (action === "cancel") {
            url = `${API_ENDPOINTS.AUCTIONS}/cancel/${auctionId}`;
        }

        try {
            const response = await fetch(url, { // Ensure fetch is inside an async function
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: action === "restart" ? JSON.stringify({ auctionId, reservePrice, duration }) : undefined,
            });

            if (response.ok) {
                alert(`${action === "start" ? "Auction started" : "Auction restarted"} successfully!`);
            } else {
                const errorData = await response.json();
                console.error(`${action === "start" ? "Start" : "Restart"} auction error:`, errorData);
                alert(`Failed to ${action} auction.`);
            }
        } catch (error) {
            console.error(`${action === "start" ? "Start" : "Restart"} auction error:`, error);
            alert(`An error occurred while trying to ${action} the auction.`);
        }
    };

    const handleCancelAuction = async (auctionId: string | undefined) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token is missing.");
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINTS.AUCTIONS}/cancel/${auctionId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Auction cancelled successfully!");
                // Update the auction status in your state or refetch the data
            } else {
                const errorData = await response.json();
                console.error("Cancel auction error:", errorData);
                alert("Failed to cancel auction.");
            }
        } catch (error) {
            console.error("Cancel auction error:", error);
            alert("An error occurred while trying to cancel the auction.");
        }
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const filteredItems = items.filter(item => {
        switch (activeTab) {
            case "NOT_LISTED":
                return item.auction === null;
            case "LISTED":
                return item.auction?.auctionStatus === "CREATED";
            case "STARTED":
                return item.auction?.auctionStatus === "STARTED";
            case "ENDED":
                return item.auction?.auctionStatus === "CLOSED" || item.auction?.auctionStatus === "CANCELLED";
            default:
                return true;
        }
    });

    const handleRestartAuction = async () => {
        if (!auctionIdToRestart || reservePrice <= 0 || !duration) {
            alert("Please fill all fields correctly.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_ENDPOINTS.AUCTIONS}/restart`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ auctionId: auctionIdToRestart, reservePrice, duration }),
            });

            if (response.ok) {
                alert("Auction restarted successfully!");
                setShowRestartDialog(false);
                setReservePrice("");
                setDuration("MINUTE");
            } else {
                const errorData = await response.json();
                console.error("Error restarting auction:", errorData);
                alert("Failed to restart auction.");
            }
        } catch (error) {
            console.error("Error restarting auction:", error);
            alert("An error occurred while restarting the auction.");
        }
    };

    const handleStartAuction = async () => {
        if (!auctionIdToStart) {
            alert("Auction ID is missing.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token is missing.");
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINTS.AUCTIONS}/start/${auctionIdToStart}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Auction started successfully!");
                setShowStartConfirmation(false);  // Close the confirmation dialog
            } else {
                const errorData = await response.json();
                console.error("Error starting auction:", errorData);
                alert("Failed to start auction.");
            }
        } catch (error) {
            console.error("Error starting auction:", error);
            alert("An error occurred while starting the auction.");
        }
    };

    return (
        <div className="profile-dialog">
            <div className="tabs">
                {["NOT_LISTED", "LISTED", "STARTED", "ENDED"].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => handleTabChange(tab)}
                    >
                        {tab === "NOT_LISTED" ? "Recently added" : tab === "LISTED" ? "Listed to auctions" : tab === "STARTED" ? "Currently on auctions" : "Ended auctions"}
                    </button>
                ))}
            </div>

            <div className="vehicle-section">
                <h2>
                    {activeTab === "NOT_LISTED" ? "Recently added" :
                        activeTab === "LISTED" ? "Listed to auctions" :
                            activeTab === "STARTED" ? "Currently on auctions" : "Ended auctions"}
                </h2>

                <div className="grid-container">
                    {filteredItems.map(item => (
                        <div key={item.id} className="auction-item">
                            <div className="image-wrapper" onClick={() => handleImageClick(item.id)}>
                                <img
                                    src={featuredImages[item.id] ? getFeaturedImageUrl(item.id, featuredImages[item.id]) : ''}
                                    alt={`${item.year} ${item.make} ${item.model}`}
                                />
                            </div>
                            <h3>{item.year} {item.make} {item.model}
                                {item.onAuction ?
                                    <span className="status-dot on-auction"></span> :
                                    <span className="status-dot not-on-auction"></span>
                                }
                            </h3>

                            {item.auction?.auctionStatus === 'CREATED' ? (
                                <button onClick={() => handleAuctionAction(item.auction?.id, "start")}>Start Now</button>
                            ) : item.auction?.auctionStatus === 'CLOSED' || item.auction?.auctionStatus === 'CANCELLED' ? (
                                <button onClick={() => handleAuctionAction(item.auction?.id, "restart")}>Restart Auction</button>
                            ) : item.auction?.auctionStatus === 'STARTED' ? (
                                <button onClick={() => handleCancelAuction(item.auction?.id)}>Cancel Auction</button>
                            ) : (
                                <button onClick={() => handleAddToAuction(item.id)}>Add to Auction</button>
                            )}
                        </div>
                    ))}

                    {showStartConfirmation && (
                        <div className="dialog-overlay">
                            <div className="dialog">
                                <h3>Confirm Auction Start</h3>
                                <p>Are you sure you want to start this auction?</p>
                                <div className="dialog-buttons">
                                    <button onClick={handleStartAuction}>Yes, Start Auction</button>
                                    <button onClick={() => setShowStartConfirmation(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

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

                    {showRestartDialog && (
                        <div className="dialog-overlay">
                            <div className="dialog">
                                <h3>Restart Auction</h3>
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
                                    <button onClick={handleRestartAuction}>Restart Auction</button>
                                    <button onClick={() => setShowRestartDialog(false)}>Cancel</button>
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
