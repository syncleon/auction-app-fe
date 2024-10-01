import React from 'react';
import { Button, TextField, Typography } from "@mui/material";

interface GeneralInfoDialogProps {
    make: string;
    setMake: React.Dispatch<React.SetStateAction<string>>;
    model: string;
    setModel: React.Dispatch<React.SetStateAction<string>>;
    mileage: string;
    setMileage: React.Dispatch<React.SetStateAction<string>>;
    year: string;
    setYear: React.Dispatch<React.SetStateAction<string>>;
    nextStep: () => void;
}

const GeneralInfoDialog: React.FC<GeneralInfoDialogProps> = ({ make, setMake, model, setModel, mileage, setMileage, year, setYear, nextStep }) => {
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">General Info</Typography>
            <TextField
                label="Make"
                variant="outlined"
                fullWidth
                margin="normal"
                value={make}
                onChange={(e) => setMake(e.target.value)}
            />
            <TextField
                label="Model"
                variant="outlined"
                fullWidth
                margin="normal"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <TextField
                label="Mileage"
                variant="outlined"
                fullWidth
                margin="normal"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
            />
            <TextField
                label="Year"
                variant="outlined"
                fullWidth
                margin="normal"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <Button variant="contained" className="next-button" onClick={nextStep} disabled={!make || !model}>Next</Button>
        </div>
    );
};

export default GeneralInfoDialog;
