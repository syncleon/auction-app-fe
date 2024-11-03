import React from 'react';
import ImageUploadDialog from './ImageUploadDialog';

interface ExteriorImageDialogProps {
    setExteriorImages: React.Dispatch<React.SetStateAction<FileList | null>>;
    prevStep: () => void;
    nextStep: () => void;
}

const ExteriorImageDialog: React.FC<ExteriorImageDialogProps> = ({ setExteriorImages }) => {
    return (
        <ImageUploadDialog setImages={setExteriorImages} title="Add some exterior images" />
    );
};

export default ExteriorImageDialog;
