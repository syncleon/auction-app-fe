import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import BidLogo from '../resources/logo.svg';
import LoginDialog from './LoginDialog';
import RegDialog from './RegDialog';

const Navbar: FC = () => {
    const navigate = useNavigate();
    const { logout } = useActions();
    const { isAuth, user } = useTypedSelector(state => state.auth);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegDialog, setOpenRegDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State to control the dropdown menu

    const handleAddClick = () => {
        if (isAuth) {
            navigate(RouteNames.ADD);
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
        navigate(RouteNames.HOME);
    };

    const handleUsernameClick = () => {
        navigate(RouteNames.PROFILE);
    };

    const handleLogoutClick = () => {
        logout();
        navigate(RouteNames.HOME);
    };

    const handleCloseLoginDialog = () => {
        setOpenLoginDialog(false);
    };

    const handlePastResultsClick = () => {
        navigate(RouteNames.PAST_AUCTIONS);
        handleCloseMenu(); // Close the dropdown after selection
    };

    const handleActiveAuctionsClick = () => {
        navigate(RouteNames.HOME); // Navigate to Active Auctions
        handleCloseMenu(); // Close the dropdown after selection
    };

    const handlePastResultsMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Open dropdown menu
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Close dropdown menu
    };

    return (
        <>
            <AppBar
                position="relative"
                sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 20px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <img
                            src={BidLogo}
                            alt="Bid Logo"
                            style={{
                                width: '130px',
                                height: 'auto',
                                transition: 'transform 0.2s ease',
                            }}
                            onClick={handleAppLogoClick}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isAuth ? (
                            <>
                                <Button
                                    onClick={handleAddClick}
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    Sell a Car
                                </Button>
                                <Button
                                    onClick={handlePastResultsMenuClick} // Open the dropdown menu
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    Auctions
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handlePastResultsClick}>Past Results</MenuItem>
                                    <MenuItem onClick={handleActiveAuctionsClick}>Active Auctions</MenuItem>
                                </Menu>
                                <Button
                                    onClick={handleUsernameClick}
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    {user.username}
                                </Button>
                                <Button
                                    onClick={handleLogoutClick}
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={handleAddClick}
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    Add Car
                                </Button>
                                <Button
                                    onClick={handleSignUpClick}
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    onClick={handlePastResultsMenuClick} //
                                    sx={{ color: 'black', textTransform: 'none', fontSize: '16px', margin: '0 8px' }}
                                >
                                    Auctions
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handlePastResultsClick}>Past Results</MenuItem>
                                    <MenuItem onClick={handleActiveAuctionsClick}>Active Auctions</MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
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
