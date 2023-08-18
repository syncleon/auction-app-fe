import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import Logo from '../resources/logo.svg';

const Navbar: FC = () => {
    const history = useHistory();
    const {logout} = useActions();
    const {isAuth, user} = useTypedSelector(state => state.auth);

    const handleAddClick = () => {
        history.push(RouteNames.ADD);
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
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                    src={Logo}
                    alt="Logo"
                    style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                    onClick={handleAppLogoClick}
                    className="logo"
                />
                {isAuth ? (
                    <>
                        <div>
                            <Button color="inherit" onClick={handleAddClick}>
                                Sell a car
                            </Button>
                            <Button color="inherit" onClick={handleUsernameClick}>
                                {user.username}
                            </Button>
                            <Button color="inherit" onClick={handleLogoutClick}>
                                Logout
                            </Button>
                        </div>
                    </>
                ) : (
                    <Button color="inherit" onClick={handleLoginClick}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
