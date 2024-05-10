import React, { FC } from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

const App: FC = () => {

    const containerStyle = {
        maxWidth: '60%'
    };


    return (
        <Container style={containerStyle}>
            <Navbar />
            <AppRouter />
        </Container>
    );
};

export default App;
