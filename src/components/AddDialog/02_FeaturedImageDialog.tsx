import React from 'react';
import ImageUploadDialog from './ImageUploadDialog';

interface FeaturedImageDialogProps {
    setFeaturedImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const FeaturedImageDialog: React.FC<FeaturedImageDialogProps> = ({ setFeaturedImages }) => {
    return (
        <ImageUploadDialog setImages={setFeaturedImages} title="Add your main featured image" />
    );
};

export default FeaturedImageDialog;
