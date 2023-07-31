import React, {FC} from 'react';
import {Menu, message} from "antd";
import {Header} from "antd/es/layout/layout";
import Logo from '../resources/logo.svg'
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {

    const history = useHistory()
    const {logout} = useActions()

    const {isAuth, user} = useTypedSelector(state => state.auth)

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const logoStyle = {
        width: '100px',
        height: 'auto',
        marginRight: '10px',
    };

    const menuStyle = {
        width: '100%',
        justifyContent: 'end',
    };

    const handleAddClick= () => {
        history.push(RouteNames.ADD)
    }

    const handleLoginClick = () => {
        history.push(RouteNames.LOGIN);
    };

    const handleAppLogoClick = () => {
        history.push(RouteNames.HOME);
    }

    const handleUsernameClick = () => {
        history.push(RouteNames.PROFILE)
    }

    const handleLogoutClick = () => {
        logout()
        message.success('Logout successful!', 2)
        history.push(RouteNames.HOME);
    };

    return (
        <Header>
            <div style={headerStyle}>
                <img src={Logo}
                     alt="Logo"
                     style={logoStyle}
                     onClick={handleAppLogoClick}
                     className={"logo"}
                />
                {isAuth ? (
                    <>
                        <Menu
                            style={menuStyle}
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            items={[
                                {
                                    key: '1',
                                    label: 'Add',
                                    onClick: handleAddClick,
                                },
                                {
                                    key: '2',
                                    label: user.username,
                                    onClick: handleUsernameClick,
                                },
                                {
                                    key: '3',
                                    label: 'Logout',
                                    onClick: handleLogoutClick,
                                },
                            ]}
                        />
                    </>
                ) : (
                    <Menu
                        style={menuStyle}
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        items={[
                            {
                                key: '1',
                                label: 'Login',
                                onClick: handleLoginClick,
                            },
                        ]}
                    />
                )}
            </div>
        </Header>
    );
};

export default Navbar;