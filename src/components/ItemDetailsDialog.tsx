import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from "../models/IItem";
import { API_ENDPOINTS } from "../apiService";
import './ItemDetailsDialog.css'; // Import your CSS file

const ItemDetailsDialog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [images, setImages] = useState<{ [key: string]: string[] }>({});  // To store categorized image filenames

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.ITEMS}/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Item = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        const fetchImagesByCategory = async (category: string) => {
            try {
                const response = await fetch(`${API_ENDPOINTS.ITEMS}/${id}/images/${category}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch images for ${category}`);
                }
                const fileNames: string[] = await response.json(); // Assuming this returns an array of filenames
                setImages(prevImages => ({ ...prevImages, [category]: fileNames }));
            } catch (error) {
                console.error(`Error fetching ${category} images:`, error);
            }
        };

        if (id) {
            fetchItemDetails();
            // Fetch images for each category
            ['featured', 'interior', 'exterior', 'mechanical', 'other'].forEach(category => {
                fetchImagesByCategory(category);
            });
        }
    }, [id]);

    if (!item) {
        return <div className="container">Loading...</div>;
    }

    const sortOrder = ['featured', 'interior', 'exterior', 'mechanical', 'other'];

    return (
        <div className="container">
            <h2>{`${item.year} ${item.make} ${item.model}`}</h2>
            <p>Mileage: {item.mileage} miles</p>
            <p>{item.onAuction ? 'This item is currently on auction.' : 'This item is not on auction.'}</p>
            <p>{item.isSold ? 'This item is sold.' : 'This item is available.'}</p>

            {sortOrder.map(category => (
                <div key={category}>
                    <h3>{`${category.charAt(0).toUpperCase() + category.slice(1)} Images`}</h3>
                    <div className="images-container">
                        {images[category] && images[category].length > 0 ? (
                            images[category].map((fileName, index) => {
                                const imageUrl = `${API_ENDPOINTS.ITEMS}/${id}/images/${category}/${fileName}`;
                                return (
                                    <img key={index} src={imageUrl} alt={`${category} ${fileName}`} />
                                );
                            })
                        ) : (
                            <p className="no-images">No {category} images available.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemDetailsDialog;
