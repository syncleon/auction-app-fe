import React, { FC, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUsers";
import './App.css';

const App: FC = () => {
    const { setUser, setIsAuth } = useActions();

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({ username: localStorage.getItem('username') || '' } as IUser);
            setIsAuth(true);
        }
    }, [setUser, setIsAuth]);

    return (
        <div className="app-container">
            <Navbar />
                <AppRouter />
        </div>
    );
};

export default App;
