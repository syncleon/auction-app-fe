import React from 'react';
import ImageUploadDialog from './ImageUploadDialog';

interface OtherImageDialogProps {
    setOtherImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const OtherImageDialog: React.FC<OtherImageDialogProps> = ({ setOtherImages }) => {
    return (
        <ImageUploadDialog setImages={setOtherImages} title="Add some other images (service cards, damaged parts, etc.)" />
    );
};

export default OtherImageDialog;
