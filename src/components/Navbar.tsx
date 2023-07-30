import React, {FC} from 'react';
import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import Logo from '../resources/logo.svg'
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {

    const history = useHistory()
    const {logout} = useActions()

    const {isAuth, user} = useTypedSelector(state => state.auth )

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

    const handleLoginClick = () => {
        history.push(RouteNames.LOGIN);
    };

    const handleSignUpClick = () => {
        history.push(RouteNames.SIGNUP);
    };

    const handleLogoutClick = () => {
        logout()
        history   .push(RouteNames.HOME);
    };

    return (
        <Header>
            <div style={headerStyle}>
                <img src={Logo} alt="Logo" style={logoStyle} />
                {
                    isAuth
                    ?
                    <>
                    <div style={{
                        marginRight: 'auto',
                        color : 'white' }}>
                        {user.username}
                    </div>m
                    <Menu
                        style={menuStyle}
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        items={[
                            {
                                key: '1',
                                label: 'Logout',
                                onClick: handleLogoutClick,

                            }
                        ]}
                    />
                    </>
                    :
                    <Menu
                        style={menuStyle}
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        items={[
                            {
                                key: '1',
                                label: 'Login',
                                onClick: handleLoginClick
                            },
                            {
                                key: '2',
                                label: 'Sign Up',
                                onClick: handleSignUpClick
                            },
                        ]}
                    />
                }
            </div>
        </Header>
    );
};

export default Navbar;