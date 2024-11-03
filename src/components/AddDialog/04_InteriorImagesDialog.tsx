import React from 'react';
import ImageUploadDialog from './ImageUploadDialog';

interface InteriorImageDialogProps {
    setInteriorImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const InteriorImageDialog: React.FC<InteriorImageDialogProps> = ({ setInteriorImages }) => {
    return (
        <ImageUploadDialog setImages={setInteriorImages} title="Add some interior images" />
    );
};

export default InteriorImageDialog;
