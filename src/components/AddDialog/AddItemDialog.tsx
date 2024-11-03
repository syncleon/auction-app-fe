import React, { useState, useEffect } from 'react';
import { useActions } from "../../hooks/useActions";
import { RouteNames } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {Stepper, Step, StepLabel} from "@mui/material";
import { message } from "antd";
import './AddItemDialog.css';
import CarDetailsDialog from './01_CarDetailsDialog';
import FeaturedImageDialog from './02_FeaturedImageDialog';
import ExteriorImageDialog from './03_ExteriorImagesDialog';
import InteriorImageDialog from './04_InteriorImagesDialog';
import MechanicalImageDialog from './05_MechanicalImagesDialog';
import OtherImageDialog from './06_OtherImagesDialog';
import SubmitDialog from './07_SubmitDIalog';
import { Item } from "../../models/IItem";

// Import icons from Material-UI
import DriveEta from '@mui/icons-material/DriveEta';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import Home from '@mui/icons-material/Home';
import Build from '@mui/icons-material/Build';
import Image from '@mui/icons-material/Image';
import CheckCircle from '@mui/icons-material/CheckCircle';

// Define steps with icons
const steps = [
    { label: 'Car Details', icon: <DriveEta /> }, // Represents the car details
    { label: 'Featured Image', icon: <PhotoCamera /> }, // Indicates uploading the featured image
    { label: 'Exterior Images', icon: <PhotoLibrary /> }, // Suggests capturing the exterior
    { label: 'Interior Images', icon: <Home /> }, // Represents the interior images
    { label: 'Mechanical Images', icon: <Build /> }, // Represents mechanical aspects
    { label: 'Other Images', icon: <Image /> }, // Indicates other types of images
    { label: 'Submit', icon: <CheckCircle /> }, // Represents finalizing the submission
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
        exteriorColor: '',
        interiorColor: '',
        engineSize: '',
        fuelType: '',
        transmission: '',
        condition: '',
        drivetrain: '',
        bodyStyle: '',
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
            item.exteriorColor, // Updated
            item.interiorColor, // Updated
            item.engineSize,
            item.fuelType,
            item.transmission,
            item.condition,
            item.drivetrain, // Updated
            item.bodyStyle, // Updated
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
            exteriorColor: '', // Updated
            interiorColor: '', // Updated
            engineSize: '',
            fuelType: '',
            transmission: '',
            condition: '',
            drivetrain: '', // Updated
            bodyStyle: '', // Updated
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
            <Stepper activeStep={step} alternativeLabel className="stepper">
                {steps.map((stepData, index) => (
                    <Step key={stepData.label} completed={index < completedSteps}>
                        <StepLabel
                            icon={stepData.icon}
                            onClick={() => handleStepClick(index)}
                            className={`step-label ${index < completedSteps ? 'completed' : ''} ${index === step ? 'current' : ''}`}
                        >
                            {stepData.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSubmit} className="form-container">
                {step === 0 && <CarDetailsDialog item={item} setItem={setItem} nextStep={nextStep} />}
                {step === 1 && <FeaturedImageDialog setFeaturedImages={setFeaturedImages} prevStep={prevStep} nextStep={nextStep} />}
                {step === 2 && <ExteriorImageDialog setExteriorImages={setExteriorImages} prevStep={prevStep} nextStep={nextStep} />}
                {step === 3 && <InteriorImageDialog setInteriorImages={setInteriorImages} prevStep={prevStep} nextStep={nextStep} />}
                {step === 4 && <MechanicalImageDialog setMechanicalImages={setMechanicalImages} prevStep={prevStep} nextStep={nextStep} />}
                {step === 5 && <OtherImageDialog setOtherImages={setOtherImages} prevStep={prevStep} nextStep={nextStep} />}
                {step === 6 && <SubmitDialog itemIsLoading={itemIsLoading} prevStep={prevStep} />}
            </form>
        </div>
    );
};

export default AddItemDialog;
