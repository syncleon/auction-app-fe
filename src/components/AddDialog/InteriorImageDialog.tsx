import React from 'react';
import { Typography } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';

interface InteriorImageDialogProps {
    setInteriorImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const InteriorImageDialog: React.FC<InteriorImageDialogProps> = ({ setInteriorImages }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Add some interior images...</Typography>
            <label className="file-upload">
                <input type="file" multiple onChange={(e) => setInteriorImages(e.target.files)} />
                <CloudUpload className="upload-icon" />
                <span>Upload Interior Images</span>
            </label>
            {/* Removed the button group containing Next and Back buttons */}
        </div>
    );
};

export default InteriorImageDialog;
