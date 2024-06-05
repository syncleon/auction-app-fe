import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { CircularProgress, Link, Typography, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface RegDialogProps {
    open: boolean;
    onClose: () => void;
    onLoginClick: () => void;
}

const RegDialog: React.FC<RegDialogProps> = ({ open, onClose, onLoginClick }) => {
    const { error, isLoading, isAuth } = useTypedSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null); // State for password complexity error
    const [step, setStep] = useState(1);
    const { register, setError } = useActions();

    useEffect(() => {
        if (!open) {
            setEmail('');
            setUsername('');
            setPassword('');
            setStep(1);
            setEmailError(null);
            setPasswordError(null); // Reset password error state
            setError('');
        }
    }, [open]);

    // Close dialog on successful login
    useEffect(() => {
        if (isAuth) {
            onClose();
        }
    }, [isAuth, onClose]);

    const validateEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar || password.length < 8) {
            return false;
        }

        return true;
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (email.trim() !== '') {
                if (validateEmail(email)) {
                    setStep(2);
                    setEmailError(null);
                } else {
                    setEmailError('Invalid email format');
                }
            } else {
                setEmailError('Email is required');
            }
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        register(username, email, password);
    };

    const handleLoginClick = () => {
        onClose();
        onLoginClick();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">
                Sign up
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Grid item xs={12}>
                <Typography align="center" variant="body2">
                    Already have an account?{' '}
                    <Link component="button" variant="body2" onClick={handleLoginClick}>
                        Sign In
                    </Link>
                </Typography>
            </Grid>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {step === 1 && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                error={emailError !== null}
                                helperText={emailError}
                            />
                        </Grid>
                    )}
                    {step === 2 && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'} // Toggle password visibility
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    error={passwordError !== null} // Apply error if password doesn't meet complexity criteria
                                    helperText={passwordError}
                                    InputProps={{ // AddItem input props for password visibility toggle
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            {error && (
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="error">
                                        {error}
                                    </Typography>
                                </Grid>
                            )}
                        </>
                    )}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            onClick={step === 1 ? handleNextStep : handleSubmit}
                            variant="contained"
                            color="primary"
                            disabled={isLoading || (step === 1 && email.trim() === '')}
                        >
                            {step === 1 ? 'Next' : (isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default RegDialog;
