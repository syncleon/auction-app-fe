import React from 'react';
import { Button, Typography } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';

interface ExteriorImageDialogProps {
    setExteriorImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const ExteriorImageDialog: React.FC<ExteriorImageDialogProps> = ({ setExteriorImages }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Add some exterior images</Typography>
            <label className="file-upload">
                <input type="file" multiple onChange={(e) => setExteriorImages(e.target.files)} />
                <CloudUpload className="upload-icon" />
                <span>Upload Exterior Images</span>
            </label>
            {/* Removed the button group containing Next and Back buttons */}
        </div>
    );
};

export default ExteriorImageDialog;
