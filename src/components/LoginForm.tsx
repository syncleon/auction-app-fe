import React, { FC, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Link,
    CircularProgress,
} from '@mui/material';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';

const LoginForm: FC = () => {
    const { error, isLoading } = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useActions();
    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(username, password);
    };

    const handleSignUpClick = () => {
        history.push(RouteNames.REGISTER);
    };

    return (
        <form
            onSubmit={handleSubmit} // Handle form submission
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: "50%"
            }}
        >
            <h1>Sign In</h1>
            <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
            />
            {error && (
                <Typography variant="body2" color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: '1rem 0' }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
            <Typography
                style={{ fontSize: '15px' }}>
                No account?{' '}
                <Link component="button"
                      variant="body2"
                      onClick={handleSignUpClick}
                      style={{ fontSize: '16px' }}>
                    Create it
                </Link>
            </Typography>
        </form>
    );
};

export default LoginForm;
