import React, { FC, useState } from 'react';
import { Button, Typography, Link, TextField, CircularProgress } from '@mui/material';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';

const RegisterForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register} = useActions();
    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(
            username,
            email,
            password);
    };

    const handleLoginClick = () => {
        history.push(RouteNames.LOGIN);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: "50%"
            }}
        >
            <h1>Register account</h1>
            <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                style={{margin: '1rem 0'}}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} color="inherit"/> : 'Register'}
            </Button>
            <Typography
                style={{ fontSize: '15px' }}>Already have an account?{' '}
                <Link component="button"
                      variant="body2"
                      onClick={handleLoginClick}
                      style={{ fontSize: '16px' }}>
                    Sign In
                </Link>
            </Typography>
        </form>
    );
};

export default RegisterForm;
