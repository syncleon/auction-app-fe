import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the interface for the currentUser object
interface Vehicle {
    id: number;
    producer: string;
    model: string;
    mileage: number;
    vin: string;
    year: string;
    engine: string;
    drivetrain: string;
    transmission: string;
    bodyStyle: string;
    exteriorColor: string;
    interiorColor: string;
    sellerType: string;
    highlights: string;
    expectedBid: number;
    damaged: boolean;
    sellerId: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    vehicles: Vehicle[];
}

const ProfileForm = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Get the authentication token from wherever it is stored (e.g., accessToken variable)
        const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTY5MjA0MjkxMywiaWF0IjoxNjg5NDUwOTEzLCJ1c2VySWQiOjF9.WvyRUYPVq1hIRx4yD6CrrjZpT6kHfMUdqQzCUK6BID4'; // Replace this with the actual token

        // Fetch the user data from the API endpoint with the Bearer token in the headers
        axios.get('http://localhost:8080/api/v1/users/current', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                // Assuming the API response contains the properties id, username, and email
                const { id, username, email, vehicles } = response.data;
                setCurrentUser({
                    id,
                    username,
                    email,
                    vehicles
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    if (!currentUser) {
        // Render a loading state while fetching the user data
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <label>ID: </label>
                <span>{currentUser.id}</span>
            </div>
            <div>
                <label>Name: </label>
                <span>{currentUser.username}</span>
            </div>
            <div>
                <label>Email: </label>
                <span>{currentUser.email}</span>
            </div>
            <div>
                <h3>Vehicles:</h3>
                <ul>
                    {currentUser.vehicles.map((vehicle) => (
                        <li key={vehicle.id}>
                            <p>
                                <strong>Producer:</strong> {vehicle.producer}
                            </p>
                            <p>
                                <strong>Model:</strong> {vehicle.model}
                            </p>
                            <p>
                                <strong>Year:</strong> {vehicle.year}
                            </p>
                            <p>
                                <strong>Mileage:</strong> {vehicle.mileage}
                            </p>
                            {/* Add more vehicle details here if needed */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileForm;
