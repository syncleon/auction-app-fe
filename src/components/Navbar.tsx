import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import BidLogo from '../resources/logo.svg'; // Import your SVG logo

const Navbar: FC = () => {
    const history = useHistory();
    const { logout } = useActions();
    const { isAuth, user } = useTypedSelector(state => state.auth);

    const handleAddClick = () => {
        history.push(RouteNames.ADD);
    };

    const handlePastAuctionsClick = () => {
        history.push(RouteNames.PAST_AUCTIONS);
    };

    const handleAddedVehiclesClick = () => {
        history.push(RouteNames.ADDED_VEHICLES);
    };

    const handleLoginClick = () => {
        history.push(RouteNames.LOGIN);
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

    return (
        <AppBar
            position="relative"
            sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0',
            }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center' // Center align items vertically
                }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px', // Adjust padding as needed
                }}>
                    <img
                        src={BidLogo} // Use your SVG logo here
                        alt="Bid Logo"
                        style={{
                            width: '130px', // Adjust width as needed
                            height: 'auto', // Maintain aspect ratio
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease', // Example of CSS transition
                        }}
                        onClick={handleAppLogoClick}
                    />
                </div>

                {isAuth ? (
                    <div>
                        <Button
                            variant="contained"
                            onClick={handlePastAuctionsClick}
                            sx={{marginRight: '8px', color: 'black', backgroundColor: '#FFD700'}}>Past Auctions</Button>
                        <Button
                            variant="contained"
                            onClick={handleAddClick}
                            sx={{marginRight: '8px', color: 'white', backgroundColor: '#4CAF50'}}>Sell a Car</Button>
                        <Button
                            variant="contained"
                            onClick={handleUsernameClick}
                            sx={{
                                marginRight: '8px',
                                color: 'black',
                                backgroundColor: '#2196F3'
                            }}>{user.username}</Button>
                        <Button
                            variant="contained"
                            onClick={handleLogoutClick}
                            sx={{color: 'black', backgroundColor: '#FF5722'}}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            variant="contained"
                            onClick={handlePastAuctionsClick}
                            sx={{marginRight: '8px', color: 'black', backgroundColor: '#FFD700'}}>Past Auctions</Button>
                        <Button
                            variant="contained"
                            onClick={handleLoginClick}
                            sx={{marginRight: '8px', color: 'white', backgroundColor: '#4CAF50'}}>Sell a Car</Button>
                        <Button
                            variant="contained"
                            onClick={handleLoginClick}
                            sx={{color: 'black', backgroundColor: '#2196F3'}}>Login</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
