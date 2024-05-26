// Navbar.tsx

import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import BidLogo from '../resources/logo.svg';
import LoginDialog from './LoginDialog';
import RegDialog from "./RegDialog";
import {message} from "antd";

const Navbar: FC = () => {
    const history = useHistory();
    const { logout } = useActions();
    const { isAuth, user} = useTypedSelector(state => state.auth);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegDialog, setOpenRegDialog] = useState(false);

    const handleAddClick = () => {
        if (isAuth) {
            history.push(RouteNames.ADD);
        } else {
            setOpenRegDialog(true);
        }
    };

    const handleSignUpClick = () => {
        setOpenLoginDialog(false);
        setOpenRegDialog(true);
    };

    const handleLoginClick = () => {
        setOpenRegDialog(false);
        setOpenLoginDialog(true);
    };

    const handleAppLogoClick = () => {
        history.push(RouteNames.HOME);
    };

    const handleUsernameClick = () => {
        history.push(RouteNames.PROFILE);
    };

    const handleLogoutClick = () => {
        logout();
        history.push(RouteNames.HOME);
    };

    const handleCloseLoginDialog = () => {
        setOpenLoginDialog(false);
    };

    return (
        <>
            <AppBar
                position="relative"
                sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                        <img src={BidLogo} alt="Bid Logo"
                             style={{ width: '130px', height: 'auto', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                             onClick={handleAppLogoClick}
                        />
                    </div>

                    {isAuth ? (
                        <div>
                            <Button onClick={handleAddClick} sx={{ color: 'black' }}>Add Car</Button>
                            <Button onClick={handleUsernameClick} sx={{ color: 'black' }}>{user.username}</Button>
                            <Button onClick={handleLogoutClick} sx={{ color: 'black' }}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button onClick={handleAddClick} sx={{ color: 'black' }}>Add Car</Button>
                            <Button onClick={handleSignUpClick} sx={{ color: 'black' }}>Sign Up</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <LoginDialog
                open={openLoginDialog}
                onClose={() => setOpenLoginDialog(false)}
                onSignUpClick={handleSignUpClick}
            />
            <RegDialog
                open={openRegDialog}
                onClose={() => setOpenRegDialog(false)}
                onLoginClick={handleLoginClick}
            />
        </>
    );
};

export default Navbar;
