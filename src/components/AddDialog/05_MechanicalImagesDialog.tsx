import React from 'react';
import ImageUploadDialog from './ImageUploadDialog';

interface MechanicalImageDialogProps {
    setMechanicalImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const MechanicalImageDialog: React.FC<MechanicalImageDialogProps> = ({ setMechanicalImages }) => {
    return (
        <ImageUploadDialog setImages={setMechanicalImages} title="Add some mechanical images (engine, exhaust, etc.)" />
    );
};

export default MechanicalImageDialog;
