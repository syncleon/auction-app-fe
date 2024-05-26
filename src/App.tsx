import React, {FC, useEffect} from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUsers";
import {ToastContainer} from "react-toastify";

const App: FC = () => {
    const {setUser, setIsAuth} = useActions();

    useEffect(() => {
        if(localStorage.getItem(('auth'))) {
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true);
        }
    }, [])

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
