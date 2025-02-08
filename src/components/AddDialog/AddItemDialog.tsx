import React, { useState, useEffect } from 'react';
import { useActions } from "../../hooks/useActions";
import { RouteNames } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Stepper, Step, StepLabel } from "@mui/material";
import { message } from "antd";
import './AddItemDialog.css';
import CarDetailsDialog from './01_CarDetailsDialog';
import FeaturedImageDialog from './02_FeaturedImageDialog';
import ExteriorImageDialog from './03_ExteriorImagesDialog';
import InteriorImageDialog from './04_InteriorImagesDialog';
import MechanicalImageDialog from './05_MechanicalImagesDialog';
import OtherImageDialog from './06_OtherImagesDialog';
import { Item } from "../../models/IItem";
import DriveEta from '@mui/icons-material/DriveEta';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import Home from '@mui/icons-material/Home';
import Build from '@mui/icons-material/Build';
import Image from '@mui/icons-material/Image';
import CheckCircle from '@mui/icons-material/CheckCircle';
import SubmitDialog from "./07_SubmitDIalog";

const steps = [
    { label: 'Car Details', icon: <DriveEta /> },
    { label: 'Featured Image', icon: <PhotoCamera /> },
    { label: 'Exterior Images', icon: <PhotoLibrary /> },
    { label: 'Interior Images', icon: <Home /> },
    { label: 'Mechanical Images', icon: <Build /> },
    { label: 'Other Images', icon: <Image /> },
    { label: 'Submit', icon: <CheckCircle /> },
];

const AddItemDialog = () => {
    const { itemError, itemSuccess, itemIsLoading } = useTypedSelector(state => state.addItem);
    const { addItem, setItemSuccess, setItemIsError } = useActions();
    const navigate = useNavigate();

    const [item, setItem] = useState<Item>({
        id: '',
        make: '',
        model: '',
        mileage: '',
        year: '',
        price: 0, // Default price as number
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
        imagesFeatured: [],
        imagesExterior: [],
        imagesInterior: [],
        imagesMechanical: [],
        imagesOther: [],
        userId: 0, // Assuming userId is a number
        username: '',
        auction: undefined, // Optional
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
            item.price.toString(),
            item.exteriorColor,
            item.interiorColor,
            item.engineSize,
            item.fuelType,
            item.transmission,
            item.condition,
            item.drivetrain,
            item.bodyStyle,
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
            price: 0, // Ensure price is reset to a number
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
            imagesFeatured: [],
            imagesExterior: [],
            imagesInterior: [],
            imagesMechanical: [],
            imagesOther: [],
            userId: 0, // Reset userId
            username: '',
            auction: undefined,
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
