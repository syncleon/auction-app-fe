import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Box, Paper, IconButton } from "@mui/material";
import { CloudUpload, Delete } from '@mui/icons-material';
import './AddItemDialog.css';

interface ImageUploadDialogProps {
    setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    title: string;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({ setImages, title }) => {
    const [imageList, setImageList] = useState<{ file: File; preview: string }[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(createImagePreview);
        setImageList(prevImages => {
            const updatedImages = [...prevImages, ...newImages];
            updateImages(updatedImages);
            return updatedImages;
        });
    };

    const createImagePreview = (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        return { file, preview: previewUrl };
    };

    const updateImages = (updatedImages: { file: File; preview: string }[]) => {
        const dataTransfer = new DataTransfer();
        updatedImages.forEach(image => dataTransfer.items.add(image.file));
        setImages(dataTransfer.files);
    };

    const handleDelete = (index: number) => {
        setImageList(prevImages => {
            const newImages = prevImages.filter((_, i) => i !== index);
            updateImages(newImages);
            return newImages;
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">{title}</Typography>
            <Paper variant="outlined" className="file-upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
                    <CloudUpload fontSize="large" className="upload-icon" />
                    <Typography variant="body2" className={isDragActive ? "drag-active" : ""}>
                        {isDragActive ? "Drop images here..." : "Drag and drop images here, or click to upload"}
                    </Typography>
                </Box>
            </Paper>

            {imageList.length > 0 && (
                <Box mt={2} display="flex" flexWrap="wrap">
                    {imageList.map((image, index) => (
                        <ImagePreview key={index} image={image} onDelete={() => handleDelete(index)} />
                    ))}
                </Box>
            )}
        </div>
    );
};

const ImagePreview: React.FC<{ image: { preview: string }; onDelete: () => void }> = ({ image, onDelete }) => (
    <Box m={1} className="image-preview" position="relative">
        <img src={image.preview} alt="preview" className="preview-image" />
        <IconButton
            size="small"
            onClick={onDelete}
            className="delete-button">
            <Delete fontSize="small" />
        </IconButton>
    </Box>
);

export default ImageUploadDialog;
