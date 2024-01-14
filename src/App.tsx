import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import './App.css'
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUsers";
import {Container} from "@mui/material";

const App:FC = () => {
    const {setUser, setIsAuth} = useActions()

    const containerStyle = {
        maxWidth: '60%', // Set your desired max width here
    };

    useEffect(() =>
        {
            if(localStorage.getItem('auth')) {
                setUser({username: localStorage.getItem('username' || '')} as IUser)
                setIsAuth(true)
            }
        }
    )

    return (
        <Container style={containerStyle}>
            <Navbar/>
            <AppRouter />
        </Container>
    );
};

export default App;