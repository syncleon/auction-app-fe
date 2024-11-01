import React, { useState, useEffect } from 'react';
import { useActions } from "../../hooks/useActions";
import { RouteNames } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Typography, Stepper, Step } from "@mui/material";
import { message } from "antd";
import './AddItemDialog.css';
import CarDetailsDialog from './CarDetailsDialog';
import FeaturedImageDialog from './FeaturedImageDialog';
import ExteriorImageDialog from './ExteriorImageDialog';
import InteriorImageDialog from './InteriorImageDialog';
import MechanicalImageDialog from './MechanicalImageDialog';
import OtherImageDialog from './OtherImageDialog';
import SubmitDialog from './SubmitDialog';
import { Item } from "../../models/IItem";

// Import icons from Material-UI
import CarIcon from '@mui/icons-material/DirectionsCar';
import FeaturedImageIcon from '@mui/icons-material/Image';
import ExteriorImageIcon from '@mui/icons-material/CameraAlt';
import InteriorImageIcon from '@mui/icons-material/Photo';
import MechanicalImageIcon from '@mui/icons-material/Build';
import OtherImageIcon from '@mui/icons-material/MoreHoriz';
import SubmitIcon from '@mui/icons-material/CheckCircle';

// Define steps with icons
const steps = [
    { label: 'Car Details', icon: <CarIcon /> },
    { label: 'Featured Image', icon: <FeaturedImageIcon /> },
    { label: 'Exterior Images', icon: <ExteriorImageIcon /> },
    { label: 'Interior Images', icon: <InteriorImageIcon /> },
    { label: 'Mechanical Images', icon: <MechanicalImageIcon /> },
    { label: 'Other Images', icon: <OtherImageIcon /> },
    { label: 'Submit', icon: <SubmitIcon /> },
];

const AddItemDialog = () => {
    const { itemError, itemSuccess, itemIsLoading } = useTypedSelector(state => state.addItem);
    const { addItem, setItemSuccess, setItemIsError } = useActions();
    const navigate = useNavigate();

    // Initial state for item based on the Item interface
    const [item, setItem] = useState<Item>({
        id: '',
        make: '',
        model: '',
        mileage: '',
        year: '',
        price: '',
        color: '',
        engineSize: '',
        fuelType: '',
        transmissionType: '',
        condition: '',
        location: '',
        description: '',
        vin: '',
        onAuction: false,
        isSold: false,
        images: []
    });

    const [featuredImages, setFeaturedImages] = useState<FileList | null>(null);
    const [exteriorImages, setExteriorImages] = useState<FileList | null>(null);
    const [interiorImages, setInteriorImages] = useState<FileList | null>(null);
    const [mechanicalImages, setMechanicalImages] = useState<FileList | null>(null);
    const [otherImages, setOtherImages] = useState<FileList | null>(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (itemSuccess) {
            message.success(itemSuccess);
            clearForm();
            navigate(RouteNames.PROFILE);
            setItemSuccess('');
        }
    }, [itemSuccess, navigate, setItemSuccess]);

    useEffect(() => {
        if (itemError) {
            message.error(itemError);
            setItemIsError('');
        }
    }, [itemError, setItemIsError]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addItem(
            item.make,
            item.model,
            item.mileage,
            item.year,
            item.price,
            item.color,
            item.engineSize,
            item.fuelType,
            item.transmissionType,
            item.condition,
            item.location,
            item.description,
            item.vin,
            {
                featured: featuredImages,
                exterior: exteriorImages,
                interior: interiorImages,
                mechanical: mechanicalImages,
                other: otherImages,
            }
        );
    };

    const clearForm = () => {
        setItem({
            id: '',
            make: '',
            model: '',
            mileage: '',
            year: '',
            price: '',
            color: '',
            engineSize: '',
            fuelType: '',
            transmissionType: '',
            condition: '',
            location: '',
            description: '',
            vin: '',
            onAuction: false,
            isSold: false,
            images: []
        });
        setFeaturedImages(null);
        setExteriorImages(null);
        setInteriorImages(null);
        setMechanicalImages(null);
        setOtherImages(null);
    };

    const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1)); // Prevent exceeding the step count
    const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0)); // Prevent going below 0

    const handleStepClick = (index: number) => {
        // Allow navigation to any completed step
        if (index <= steps.length - 1) {
            setStep(index);
        }
    };

    const completedSteps = step;

    return (
        <div className="add-item-dialog">
            <Stepper activeStep={step} className="stepper">
                {steps.map((stepData, index) => (
                    <Step
                        key={stepData.label}
                        completed={index < completedSteps}
                        onClick={() => handleStepClick(index)} // Handle step click
                        style={{ cursor: index <= completedSteps ? 'pointer' : 'default' }} // Change cursor based on completion
                    >
                        <div className="step-content">
                            {stepData.icon}
                            <Typography
                                className={`step-label ${index < completedSteps ? 'completed' : ''} ${index === step ? 'current' : ''}`}
                            >
                                {stepData.label}
                            </Typography>
                        </div>
                    </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSubmit} className="form-container">
                {step === 0 && (
                    <CarDetailsDialog
                        item={item}
                        setItem={setItem}
                        nextStep={nextStep}
                    />
                )}
                {step === 1 && (
                    <FeaturedImageDialog
                        setFeaturedImages={setFeaturedImages}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 2 && (
                    <ExteriorImageDialog
                        setExteriorImages={setExteriorImages}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 3 && (
                    <InteriorImageDialog
                        setInteriorImages={setInteriorImages}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 4 && (
                    <MechanicalImageDialog
                        setMechanicalImages={setMechanicalImages}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 5 && (
                    <OtherImageDialog
                        setOtherImages={setOtherImages}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 6 && (
                    <SubmitDialog
                        itemIsLoading={itemIsLoading}
                        prevStep={prevStep}
                    />
                )}
            </form>
        </div>
    );
};

export default AddItemDialog;
