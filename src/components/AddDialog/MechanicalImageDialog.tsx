import React from 'react';
import { Typography } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';

interface MechanicalImageDialogProps {
    setMechanicalImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const MechanicalImageDialog: React.FC<MechanicalImageDialogProps> = ({ setMechanicalImages }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Add some mechanical images, engine, exhaust, etc..</Typography>
            <label className="file-upload">
                <input type="file" multiple onChange={(e) => setMechanicalImages(e.target.files)} />
                <CloudUpload className="upload-icon" />
                <span>Upload Mechanical Images</span>
            </label>
            {/* Removed the button group containing Next and Back buttons */}
        </div>
    );
};

export default MechanicalImageDialog;
