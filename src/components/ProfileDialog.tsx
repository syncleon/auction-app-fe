import React, { useEffect, useState } from 'react';
import './ProfileDialog.css';
import { useNavigate } from 'react-router-dom';
import {Item} from "../models/IItem";
import {API_ENDPOINTS} from "../apiService";
import {RouteNames} from "../routes";

const ProfileDialog = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [featuredImages, setFeaturedImages] = useState<{ [key: string]: string }>({});  // Store featured images by item ID
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchItems = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.CURRENT_USER_ITEMS, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
                const data: Item[] = await response.json();
                setItems(data);

                // Fetch featured images for each item
                await Promise.all(data.map(async (item) => {
                    const filenameResponse = await fetch(`${API_ENDPOINTS.ITEMS}/${item.id}/images/featured`);
                    if (filenameResponse.ok) {
                        const filenames: string[] = await filenameResponse.json();
                        if (filenames.length > 0) {
                            setFeaturedImages(prev => ({ ...prev, [item.id]: filenames[0] }));  // Store the first filename for each item
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
        navigate(RouteNames.ITEM_DETAILS.replace(':id', itemId));  // use navigate instead of history.push
    };

    const getFeaturedImageUrl = (itemId: string, filename: string) => {
        return `${API_ENDPOINTS.ITEMS}/${itemId}/images/featured/${filename}`; // Adjust this to match your API's structure
    };


    return (
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
                </div>
            ))}
        </div>
    );
};

export default ProfileDialog;
