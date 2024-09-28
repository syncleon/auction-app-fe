import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import BidLogo from '../resources/logo.svg';
import LoginDialog from './LoginDialog';
import RegDialog from "./RegDialog";

const Navbar: FC = () => {
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const { logout } = useActions();
    const { isAuth, user } = useTypedSelector(state => state.auth);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegDialog, setOpenRegDialog] = useState(false);

    const handleAddClick = () => {
        if (isAuth) {
            navigate(RouteNames.ADD); // Use navigate instead of history.push
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
        navigate(RouteNames.HOME); // Use navigate instead of history.push
    };

    const handleUsernameClick = () => {
        navigate(RouteNames.PROFILE); // Use navigate instead of history.push
    };

    const handleLogoutClick = () => {
        logout();
        navigate(RouteNames.HOME); // Use navigate instead of history.push
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
                            <Button onClick={handleAddClick} sx={{ color: 'black', textTransform: 'none', fontSize: '16px' }}>Sell a Car</Button>
                            <Button onClick={handleUsernameClick} sx={{ color: 'black', textTransform: 'none', fontSize: '16px' }}>{user.username}</Button>
                            <Button onClick={handleLogoutClick} sx={{ color: 'black', textTransform: 'none', fontSize: '16px' }}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button onClick={handleAddClick} sx={{ color: 'black', textTransform: 'none', fontSize: '16px' }}>Add Car</Button>
                            <Button onClick={handleSignUpClick} sx={{ color: 'black', textTransform: 'none', fontSize: '16px' }}>Sign Up</Button>
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
