import React, { FC, useState } from 'react';
import { Button, Container, Typography, Link, Grid, TextField, CircularProgress } from '@mui/material';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';
import { rules } from '../utils/rules';

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
                alignItems: 'center',
            }}
        >
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
            <Typography>
                Have an account?{' '}
                <Link component="button" variant="body2" onClick={handleLoginClick}>
                    Perform login!
                </Link>
            </Typography>
        </form>
    );
};

export default RegisterForm;
