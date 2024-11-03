import React from 'react';
import { Button, CircularProgress, Typography, Box, Paper } from "@mui/material";

interface SubmitDialogProps {
    itemIsLoading: boolean;
    prevStep: () => void;
}

const SubmitDialog: React.FC<SubmitDialogProps> = ({ itemIsLoading, prevStep }) => {
    return (
        <Paper elevation={3} className="step-content" style={{ padding: '24px', borderRadius: '8px' }}>
            <Typography variant="h6" className="step-title" style={{ marginBottom: '16px', textAlign: 'center' }}>
                Submit
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
                {itemIsLoading ? (
                    <CircularProgress />
                ) : (
                    <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Are you ready to submit your item?
                    </Typography>
                )}
            </Box>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    className="next-button"
                    type="submit"
                    disabled={itemIsLoading}
                    style={{ padding: '10px 20px' }}
                >
                    Submit
                </Button>
            </Box>
        </Paper>
    );
};

export default SubmitDialog;
