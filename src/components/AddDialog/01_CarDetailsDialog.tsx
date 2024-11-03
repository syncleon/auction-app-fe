import React, { Component } from 'react';
import {
    Button,
    TextField,
    Typography,
    FormControl,
    Grid,
    Autocomplete
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

interface GeneralInfoDialogState {
    filteredModels: string[];
    years: string[];
    errors: {
        year?: string;
        mileage?: string;
        price?: string;
        engineSize?: string;
        vin?: string;
    };
}

class CarDetailsDialog extends Component<GeneralInfoDialogProps, GeneralInfoDialogState> {
    constructor(props: GeneralInfoDialogProps) {
        super(props);

        const currentYear = new Date().getFullYear();
        const years = Array.from({length: currentYear - 1900 + 1}, (_, i) => (1900 + i).toString()).reverse();

        this.state = {
            filteredModels: [],
            years: years,
            errors: {}
        };
    }

    validateFields = () => {
        const {year, mileage, price, vin} = this.props.item;
        const errors: { year?: string; mileage?: string; price?: string; vin?: string } = {};

        // Validate year
        if (!year) {
            errors.year = "Year is required.";
        } else if (isNaN(Number(year))) {
            errors.year = "Year must be a valid number.";
        }

        // Validate mileage
        if (!mileage) {
            errors.mileage = "Mileage is required.";
        } else if (isNaN(Number(mileage)) || Number(mileage) < 0) {
            errors.mileage = "Mileage must be a non-negative number.";
        }

        // Validate price
        if (!price) {
            errors.price = "Price is required.";
        } else if (isNaN(Number(price)) || Number(price) < 0) {
            errors.price = "Price must be a non-negative number.";
        }

        // VIN Validation
        if (!vin) {
            errors.vin = "VIN is required.";
        } else if (vin.length !== 17) {
            errors.vin = "VIN must be exactly 17 characters long.";
        }

        this.setState({errors});
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    handleMakeChange = (event: any, value: any) => {
        if (value) {
            this.props.setItem(prev => ({...prev, make: value.make, model: ''}));
            this.setState({filteredModels: value.models});
        } else {
            this.props.setItem(prev => ({...prev, make: '', model: ''}));
            this.setState({filteredModels: []});
        }
    };

    handleModelChange = (event: any, value: string | null) => {
        this.props.setItem(prev => ({...prev, model: value || ''}));
    };

    handleInputChange = (field: keyof Item) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        // Limit input for specific fields
        if (field === "description" && value.length > 800) {
            value = value.slice(0, 800); // Truncate to 800 characters
        } else if (field === "vin" && value.length > 17) {
            value = value.slice(0, 17); // Truncate to 17 characters
        }

        this.props.setItem(prev => ({...prev, [field]: value}));
    };

    render() {
        const {item} = this.props;
        const {filteredModels, years, errors} = this.state;

        return (
            <div className="step-content">
                <Typography variant="h6" className="step-title">Tell Us More About Your Car</Typography>
                <Grid container spacing={2}>
                    {/* Required Fields First */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Make <span style={{color: 'red'}}>*</span></Typography>
                            <Autocomplete
                                options={carMakesAndModels}
                                getOptionLabel={(option) => option.make}
                                onChange={this.handleMakeChange}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Model <span style={{color: 'red'}}>*</span></Typography>
                            <Autocomplete
                                options={filteredModels}
                                onChange={this.handleModelChange}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                                disabled={!item.make}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Year <span style={{color: 'red'}}>*</span></Typography>
                            <Autocomplete
                                options={years}
                                value={item.year || null}
                                onChange={(event, newValue) => {
                                    this.props.setItem(prev => ({...prev, year: newValue || ''}));
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
                            <Typography variant="body2" gutterBottom>Mileage (in km) <span style={{color: 'red'}}>*</span></Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="number"
                                value={item.mileage}
                                onChange={this.handleInputChange("mileage")}
                                error={!!errors.mileage}
                                helperText={errors.mileage}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Price ($) <span style={{color: 'red'}}>*</span></Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="number"
                                value={item.price}
                                onChange={this.handleInputChange("price")}
                                error={!!errors.price}
                                helperText={errors.price}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>VIN <span style={{color: 'red'}}>*</span></Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={item.vin}
                                onChange={this.handleInputChange("vin")}
                                error={!!errors.vin}
                                helperText={errors.vin || "VIN must be exactly 17 characters."}
                            />
                        </FormControl>
                    </Grid>
                    {/* Non-Required Fields */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Exterior Color</Typography>
                            <Autocomplete
                                options={colors}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => {
                                    this.props.setItem(prev => ({...prev, exteriorColor: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Interior Color</Typography>
                            <Autocomplete
                                options={colors}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => {
                                    this.props.setItem(prev => ({...prev, interiorColor: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Engine Size (L)</Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="number"
                                value={item.engineSize}
                                onChange={this.handleInputChange("engineSize")}
                                error={!!errors.engineSize}
                                helperText={errors.engineSize}
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
                                    this.props.setItem(prev => ({...prev, fuelType: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
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
                                    this.props.setItem(prev => ({...prev, transmission: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
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
                                    this.props.setItem(prev => ({...prev, condition: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
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
                                    this.props.setItem(prev => ({...prev, drivetrain: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Body Style</Typography>
                            <Autocomplete
                                options={bodyStyles}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => {
                                    this.props.setItem(prev => ({...prev, bodyStyle: value ? value.label : ''}));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Location <span style={{color: 'red'}}>*</span></Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={item.location}
                                onChange={this.handleInputChange("location")}
                                placeholder="City, State"
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
                                inputProps={{maxLength: 800}}
                                value={item.description}
                                helperText={`${item.description.length}/800 characters`}
                                onChange={this.handleInputChange("description")}
                                placeholder="Tell potential buyers about your car..."
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CarDetailsDialog;
