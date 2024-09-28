import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate for navigation
import './Home.css';
import { Item } from "../models/IItem";
import { API_ENDPOINTS } from "../apiService";
import { RouteNames } from "../routes";

const HomeDialog: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();  // hook to navigate programmatically

    useEffect(() => {
        fetch(API_ENDPOINTS.ITEMS)
            .then(response => response.json())
            .then((data: Item[]) => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleImageClick = (itemId: string) => {
        navigate(RouteNames.ITEM_DETAILS.replace(':id', itemId));  // use navigate instead of history.push
    };

    return (
        <div className="grid-container">
            {items.map(item => (
                <div key={item.id} className="auction-item">
                    <div className="image-wrapper" onClick={() => handleImageClick(item.id)}>
                        <img
                            src={API_ENDPOINTS.ITEM_IMAGE_0(item.id)}
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

export default HomeDialog;
