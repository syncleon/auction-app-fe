import React from 'react';
import { Button, Typography } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';

interface FeaturedImageDialogProps {
    setFeaturedImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const FeaturedImageDialog: React.FC<FeaturedImageDialogProps> = ({ setFeaturedImages, prevStep, nextStep }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Featured Image</Typography>
            <label className="file-upload">
                <input type="file" multiple onChange={(e) => setFeaturedImages(e.target.files)} />
                <CloudUpload className="upload-icon" />
                <span>Upload Featured Images</span>
            </label>
            <div className="button-group">
                <Button onClick={prevStep} className="back-button">Back</Button>
                <Button variant="contained" className="next-button" onClick={nextStep}>Next</Button>
            </div>
        </div>
    );
};

export default FeaturedImageDialog;
