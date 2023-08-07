import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Vehicle } from '../models/IVehicle';

interface User {
    id: number;
    username: string;
    email: string;
    vehicles: Vehicle[];
}

interface ImageGalleryItem {
    original: string;
    thumbnail: string;
}

const ProfileForm = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/api/v1/users/current', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const { id, username, email, vehicles } = response.data;
                setCurrentUser({
                    id,
                    username,
                    email,
                    vehicles,
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    // Function to resize and map vehicle images to optimized URLs
    const getOptimizedImageUrls = (images: string[]): ImageGalleryItem[] => {
        const serverUrl = 'http://localhost:63958/';
        return images.map((image) => ({
            original: serverUrl + image + '?width=500&height=500', // Resize the image on the server side using query parameters
            thumbnail: serverUrl + image + '?width=100&height=100', // Use the same URL for thumbnails for simplicity
        }));
    };

    return (
        <div>
            {/* User profile details */}
            {/* ... */}
            <div>
                <Row gutter={[16, 16]}>
                    {currentUser.vehicles.map((vehicle) => (
                        <Col key={vehicle.id}>
                            <h1>Vehicle Details</h1>
                            {/* ... other vehicle details ... */}
                            <p>Images:</p>
                            {/* Image slider with resized images */}
                            <ImageGallery
                                items={getOptimizedImageUrls(vehicle.images)}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showNav={false}
                                // Set the dimensions of the images in the slider
                                renderItem={(item) => (
                                    <img
                                        src={item.original}
                                        alt={item.originalAlt}
                                        style={{ width: 'auto', height: '500px' }}
                                    />
                                )}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProfileForm;
