import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { CircularProgress, IconButton, InputAdornment, Link, Typography, Grid, Box } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import {message} from "antd";

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onSignUpClick: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onSignUpClick }) => {
    const { error, isLoading, isAuth, success } = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useActions();

    useEffect(() => {
        if (!open) {
            setUsername('');
            setPassword('');
            setShowPassword(false);
        }
    }, [open]);

    // Close dialog on successful login
    useEffect(() => {
        if (isAuth && open) {
            onClose();
            message.success(success);
        }
    }, [isAuth, onClose, open, success]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(username, password);
    };

    const handleSignUpClick = () => {
        onClose();
        onSignUpClick();
    };

    return (
        <Dialog
            open={open}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle textAlign="center">Sign In
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box mt={2} textAlign="center">
                <Typography variant="body2">
                    No account?{' '}
                    <Link component="button" variant="body2" onClick={handleSignUpClick}>
                        Create it
                    </Link>
                </Typography>
            </Box>
            <DialogContent dividers>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {error && (
                            <Grid item>
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
