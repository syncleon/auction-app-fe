import React, { useState, useEffect } from 'react';
import { useActions } from "../../hooks/useActions";
import { RouteNames } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CircularProgress, Button, Typography, Stepper, Step } from "@mui/material";
import { message } from "antd";
import './AddItemDialog.css';
import GeneralInfoDialog from './GeneralInfoDialog';
import FeaturedImageDialog from './FeaturedImageDialog';
import ExteriorImageDialog from './ExteriorImageDialog';
import InteriorImageDialog from './InteriorImageDialog';
import MechanicalImageDialog from './MechanicalImageDialog';
import OtherImageDialog from './OtherImageDialog';
import SubmitDialog from './SubmitDialog';

const steps = [
    'General Info',
    'Featured Image',
    'Exterior Images',
    'Interior Images',
    'Mechanical Images',
    'Other Images',
    'Submit'
];

const AddItemDialog = () => {
    const { itemError, itemSuccess, itemIsLoading } = useTypedSelector(state => state.addItem);
    const { addItem, setItemSuccess, setItemIsError } = useActions();
    const navigate = useNavigate();

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState('');
    const [year, setYear] = useState('');
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
        addItem(make, model, mileage, year, {
            featured: featuredImages,
            exterior: exteriorImages,
            interior: interiorImages,
            mechanical: mechanicalImages,
            other: otherImages,
        });
    };

    const clearForm = () => {
        setMake('');
        setModel('');
        setMileage('');
        setYear('');
        setFeaturedImages(null);
        setExteriorImages(null);
        setInteriorImages(null);
        setMechanicalImages(null);
        setOtherImages(null);
    };

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const handleStepClick = (index: number) => {
        // Only allow navigating to previous steps or the current step
        if (index <= step) {
            setStep(index);
        }
    };

    const completedSteps = step; // All steps before the current step are completed

    return (
        <div className="add-item-dialog">
            <Stepper activeStep={step} className="stepper">
                {steps.map((label, index) => (
                    <Step key={label} completed={index < completedSteps} onClick={() => handleStepClick(index)}>
                        <Typography
                            className={`step-label ${index < completedSteps ? 'completed' : ''} ${index === step ? 'current' : ''}`}
                        >
                            {label}
                        </Typography>
                    </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSubmit} className="form-container">
                {/* Step Contents */}
                {step === 0 && (
                    <GeneralInfoDialog
                        make={make}
                        setMake={setMake}
                        model={model}
                        setModel={setModel}
                        mileage={mileage}
                        setMileage={setMileage}
                        year={year}
                        setYear={setYear}
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
