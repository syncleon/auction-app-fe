import React from 'react';
import { Button, CircularProgress, Typography } from "@mui/material";

interface SubmitDialogProps {
    itemIsLoading: boolean;
    prevStep: () => void;
}

const SubmitDialog: React.FC<SubmitDialogProps> = ({ itemIsLoading, prevStep }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Submit</Typography>
            {itemIsLoading ? (
                <CircularProgress />
            ) : (
                <Typography variant="body1">Are you ready to submit your item?</Typography>
            )}
            <div className="button-group">
                <Button onClick={prevStep} className="back-button">Back</Button>
                <Button variant="contained" className="next-button" type="submit" disabled={itemIsLoading}>Submit</Button>
            </div>
        </div>
    );
};

export default SubmitDialog;
