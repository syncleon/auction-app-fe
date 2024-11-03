import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    FormControl,
    Grid,
    Autocomplete, FormHelperText
} from "@mui/material";
import { Item } from "../../models/IItem";
import { carMakesAndModels } from "../../resources/carMakesAndModels";
import { fuelTypes } from "../../resources/fuelTypes";
import { conditions } from "../../resources/conditions";
import { transmissionTypes } from "../../resources/transmissionTypes";
import { colors } from "../../resources/colors";
import { drivetrainOptions } from "../../resources/DrivetrainOptions";
import { bodyStyles } from "../../resources/bodyStyles";

interface GeneralInfoDialogProps {
    item: Item;
    setItem: React.Dispatch<React.SetStateAction<Item>>;
    nextStep: () => void;
}

const CarDetailsDialog: React.FC<GeneralInfoDialogProps> = ({ item, setItem, nextStep }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (1900 + i).toString()).reverse();

    const [filteredModels, setFilteredModels] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateFields = () => {
        const { year, mileage, price, vin, location } = item;
        const errors: { year?: string; mileage?: string; price?: string; vin?: string; location?: string } = {};
        if (!year) {
            errors.year = "Year is required.";
        } else if (isNaN(Number(year))) {
            errors.year = "Year must be a valid number.";
        }
        if (!mileage) {
            errors.mileage = "Mileage is required.";
        } else if (isNaN(Number(mileage)) || Number(mileage) < 0) {
            errors.mileage = "Mileage must be a non-negative number.";
        }
        if (!price) {
            errors.price = "Price is required.";
        } else if (isNaN(Number(price)) || Number(price) < 0) {
            errors.price = "Price must be a non-negative number.";
        }
        if (!vin) {
            errors.vin = "VIN is required.";
        } else if (vin.length !== 17) {
            errors.vin = "VIN must be exactly 17 characters long.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleMakeChange = (event: any, value: any) => {
        if (value) {
            setItem(prev => ({
                ...prev,
                make: value.make,
                model: '',
                modelOptions: value.models // Store the models for this make
            }));
            setFilteredModels(value.models); // Update the filtered models
        } else {
            setItem(prev => ({ ...prev, make: '', model: '', modelOptions: [] }));
            setFilteredModels([]);
        }
    };

    const handleModelChange = (event: any, value: string | null) => {
        setItem(prev => ({ ...prev, model: value || '' }));
    };

    const handleInputChange = (field: keyof Item) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if ((field === "price" || field === "mileage") && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        if (field === "description" && value.length > 800) {
            value = value.slice(0, 800);
        } else if (field === "vin" && value.length > 17) {
            value = value.slice(0, 17);
        }

        setItem(prev => ({ ...prev, [field]: value }));
    };
    return (
        <div className="step-content">
            <Typography variant="h6" className="step-title">Tell Us More About Your Car</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Make <span style={{ color: 'red' }}>*</span></Typography>
                        <Autocomplete
                            options={carMakesAndModels}
                            getOptionLabel={(option) => option.make}
                            onChange={handleMakeChange}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                            value={carMakesAndModels.find(make => make.make === item.make) || null} // Persist make selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>
                            Model <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Autocomplete
                            options={filteredModels}
                            onChange={handleModelChange}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                            disabled={!item.make}
                            value={item.model}
                        />
                        {!item.make && (
                            <FormHelperText style={{ color: 'gray' }}>
                                Available after selecting make
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Year <span style={{ color: 'red' }}>*</span></Typography>
                        <Autocomplete
                            options={years}
                            value={item.year || null}
                            onChange={(event, newValue) => {
                                setItem(prev => ({ ...prev, year: newValue || '' }));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.year}
                                    helperText={errors.year}
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Mileage<span style={{ color: 'red' }}>*</span></Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            type="text"
                            inputMode="numeric"
                            value={item.mileage}
                            onChange={handleInputChange("mileage")}
                            error={!!errors.mileage}
                            helperText={errors.mileage || "in km."}
                            inputProps={{ maxLength: 10 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Price<span style={{ color: 'red' }}>*</span></Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            type="text"
                            inputMode="numeric"
                            value={item.price}
                            onChange={handleInputChange("price")}
                            error={!!errors.price}
                            helperText={errors.price || "in $."}
                            inputProps={{ maxLength: 10 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>VIN <span style={{ color: 'red' }}>*</span></Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={item.vin}
                            onChange={handleInputChange("vin")}
                            error={!!errors.vin}
                            helperText={errors.vin || "VIN must be exactly 17 characters."}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Body Style</Typography>
                        <Autocomplete
                            options={bodyStyles} // Assuming bodyStyles is an array of options
                            getOptionLabel={(option) => option.label} // Adjust based on your structure
                            onChange={(event, value) => {
                                setItem(prev => ({ ...prev, bodyStyle: value ? value.label : '' }));
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            value={bodyStyles.find(style => style.label === item.bodyStyle) || null} // Persist selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Location</Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={item.location}
                            onChange={handleInputChange("location")}
                            error={!!errors.location}
                            helperText={errors.location}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Exterior Color</Typography>
                        <Autocomplete
                            options={colors}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                setItem(prev => ({ ...prev, exteriorColor: value ? value.label : '' }));
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            value={colors.find(color => color.label === item.exteriorColor) || null} // Persist selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Fuel Type</Typography>
                        <Autocomplete
                            options={fuelTypes}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                setItem(prev => ({ ...prev, fuelType: value ? value.label : '' }));
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            value={fuelTypes.find(type => type.label === item.fuelType) || null} // Persist selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Condition</Typography>
                        <Autocomplete
                            options={conditions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                setItem(prev => ({ ...prev, condition: value ? value.label : '' }));
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            value={conditions.find(condition => condition.label === item.condition) || null} // Persist selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Transmission Type</Typography>
                        <Autocomplete
                            options={transmissionTypes}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                setItem(prev => ({ ...prev, transmission: value ? value.label : '' }));
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            value={transmissionTypes.find(type => type.label === item.transmission) || null} // Persist selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Drivetrain</Typography>
                        <Autocomplete
                            options={drivetrainOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => {
                                setItem(prev => ({ ...prev, drivetrain: value ? value.label : '' }));
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            value={drivetrainOptions.find(option => option.label === item.drivetrain) || null} // Persist selection
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="dense">
                        <Typography variant="body2" gutterBottom>Description</Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            multiline
                            rows={4}
                            value={item.description}
                            onChange={handleInputChange("description")}
                            inputProps={{ maxLength: 800 }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

export default CarDetailsDialog;
