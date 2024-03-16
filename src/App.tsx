// Import necessary dependencies
import React, { FC, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUsers';
import { Container } from '@mui/material';
import { apiInstance } from './axios-instance'; // Import the axios instance

const App: FC = () => {
    const { setUser, setIsAuth } = useActions();

    const containerStyle = {
        maxWidth: '60%', // Set your desired max width here
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({ username: localStorage.getItem('username' || '') } as IUser);
            setIsAuth(true);
        }

        const intervalId = setInterval(() => {
            handleExpiredAuctions();
        }, 5000);

        // Cleanup function
        return () => clearInterval(intervalId);
    }, [setUser, setIsAuth]);

    const handleExpiredAuctions = () => {
        apiInstance
            .post(`auctions/closeExpired`)
            .then((response) => {
                console.log('Auction closed successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error closing auction:', error);
            });
    };

    return (
        <Container style={containerStyle}>
            <Navbar />
            <AppRouter />
        </Container>
    );
};

export default App;
