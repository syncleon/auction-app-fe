import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import BidLogo from '../resources/logo.svg';

const Navbar: FC = () => {
    const history = useHistory();
    const { logout } = useActions();
    const { isAuth, user } = useTypedSelector(state => state.auth);
    const [desiredRoute, setDesiredRoute] = useState<string | null>(null);

    const handleAddClick = () => {
        if (isAuth) {
            history.push(RouteNames.ADD);
        } else {
            setDesiredRoute(RouteNames.ADD);
            history.push(RouteNames.LOGIN);
        }
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
                        <Button onClick={handleAddClick} sx={{ color: 'black' }}>Sell a Car</Button>
                        <Button onClick={handleUsernameClick} sx={{ color: 'black' }}>{user.username}</Button>
                        <Button onClick={handleLogoutClick} sx={{ color: 'black' }}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={handleAddClick} sx={{ color: 'black' }}>Sell a Car</Button>
                        <Button onClick={handleLoginClick} sx={{ color: 'black' }}>Login</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
