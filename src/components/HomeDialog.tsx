import React, { useEffect, useState } from 'react';
import './Home.css';
import { Item } from "../models/IItem";
import {API_ENDPOINTS} from "../apiService";

const HomeDialog: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch(API_ENDPOINTS.ITEMS)
            .then(response => response.json())
            .then((data: Item[]) => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    return (
        <div className="grid-container">
            {items.map(item => (
                <div key={item.id} className="auction-item">
                    <div className="image-wrapper">
                        <img
                            src={API_ENDPOINTS.ITEM_IMAGE(item.id)}
                            alt={`${item.year} ${item.make} ${item.model}`}
                        />
                    </div>
                    <h3>{item.make} {item.model}</h3>
                    <p>
                        {item.mileage} km,&nbsp;
                        {item.onAuction ? 'On Auction' : 'Not on Auction'},&nbsp;
                        {item.isSold ? 'Sold' : 'Available'}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default HomeDialog;
