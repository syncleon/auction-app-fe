import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Box, Paper } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';

interface OtherImageDialogProps {
    setOtherImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const OtherImageDialog: React.FC<OtherImageDialogProps> = ({ setOtherImages }) => {
    const onDrop = (acceptedFiles: File[]) => {
        const dataTransfer = new DataTransfer();
        acceptedFiles.forEach((file) => dataTransfer.items.add(file));
        setOtherImages(dataTransfer.files);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Add some other images, books, damaged parts, etc.</Typography>

            <Paper variant="outlined" className="file-upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
                    <CloudUpload fontSize="large" className="upload-icon" />
                    {isDragActive ? (
                        <Typography variant="body2" color="primary">Drop images here...</Typography>
                    ) : (
                        <Typography variant="body2">Drag and drop images here, or click to upload</Typography>
                    )}
                </Box>
            </Paper>

            {/* Removed the button group containing Next and Back buttons */}
        </div>
    );
};

export default OtherImageDialog;
