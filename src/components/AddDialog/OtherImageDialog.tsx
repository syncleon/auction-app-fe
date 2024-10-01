import React from 'react';
import { Button, Typography } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';

interface OtherImageDialogProps {
    setOtherImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const OtherImageDialog: React.FC<OtherImageDialogProps> = ({ setOtherImages, prevStep, nextStep }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Other Images</Typography>
            <label className="file-upload">
                <input type="file" multiple onChange={(e) => setOtherImages(e.target.files)} />
                <CloudUpload className="upload-icon" />
                <span>Upload Other Images</span>
            </label>
            <div className="button-group">
                <Button onClick={prevStep} className="back-button">Back</Button>
                <Button variant="contained" className="next-button" onClick={nextStep}>Next</Button>
            </div>
        </div>
    );
};

export default OtherImageDialog;
