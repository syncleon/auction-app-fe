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
import { carMakesAndModels } from "./carMakesAndModels";
import { fuelTypes } from "./fuelTypes";
import { conditions } from "./conditions";
import { transmissionTypes } from "./transmissionTypes"; // Import transmission types
import { colors } from "./colors"; // Import colors

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
    };
}

class CarDetailsDialog extends Component<GeneralInfoDialogProps, GeneralInfoDialogState> {
    constructor(props: GeneralInfoDialogProps) {
        super(props);

        const currentYear = new Date().getFullYear();
        // Create years array from 1900 to current year
        const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (1900 + i).toString()).reverse();

        this.state = {
            filteredModels: [],
            years: years,
            errors: {}
        };
    }

    validateFields = () => {
        const { year, mileage, price } = this.props.item;
        const errors: { year?: string; mileage?: string; price?: string } = {};

        // Validate year
        if (year && isNaN(Number(year))) {
            errors.year = "Year must be a number.";
        }

        // Validate mileage
        if (mileage && isNaN(Number(mileage))) {
            errors.mileage = "Mileage must be a number.";
        }

        // Validate price
        if (price && isNaN(Number(price))) {
            errors.price = "Price must be a number.";
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    handleMakeChange = (event: any, value: any) => {
        if (value) {
            this.props.setItem(prev => ({ ...prev, make: value.make, model: '' }));
            this.setState({ filteredModels: value.models });
        } else {
            this.props.setItem(prev => ({ ...prev, make: '', model: '' }));
            this.setState({ filteredModels: [] });
        }
    };

    handleModelChange = (event: any, value: string | null) => {
        this.props.setItem(prev => ({ ...prev, model: value || '' }));
    };

    handleInputChange = (field: keyof Item) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setItem(prev => ({ ...prev, [field]: event.target.value }));
    };

    handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        this.props.setItem(prev => ({ ...prev, year: newValue || '' }));
    };

    handleSubmit = () => {
        if (this.validateFields()) {
            this.props.nextStep();
        }
    };

    render() {
        const { item } = this.props;
        const { filteredModels, years, errors } = this.state;

        return (
            <div className="step-content">
                <Typography variant="h6" className="step-title">Tell us more about your car</Typography>
                <Grid container spacing={1} > {/* Reduced spacing from 2 to 1 */}
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth margin="dense"> {/* Changed to margin="dense" */}
                            <Typography variant="body2" gutterBottom>Make</Typography>
                            <Autocomplete
                                options={carMakesAndModels}
                                getOptionLabel={(option) => option.make}
                                onChange={this.handleMakeChange}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Model</Typography>
                            <Autocomplete
                                options={filteredModels}
                                onChange={this.handleModelChange}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                                disabled={!item.make}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Year</Typography>
                            <Autocomplete
                                options={years}
                                value={item.year || null}
                                onChange={(event, newValue) => {
                                    this.props.setItem(prev => ({ ...prev, year: newValue || '' }));
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
                            <Typography variant="body2" gutterBottom>Mileage</Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={item.mileage}
                                onChange={this.handleInputChange("mileage")}
                                error={!!errors.mileage}
                                helperText={errors.mileage}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Price in $</Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={item.price}
                                onChange={this.handleInputChange("price")}
                                error={!!errors.price}
                                helperText={errors.price}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Color</Typography>
                            <Autocomplete
                                options={colors}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => {
                                    this.props.setItem(prev => ({ ...prev, color: value ? value.label : '' }));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>Engine size in L</Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={item.engineSize}
                                onChange={this.handleInputChange("engineSize")}
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
                                    this.props.setItem(prev => ({ ...prev, fuelType: value ? value.label : '' }));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
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
                                    this.props.setItem(prev => ({ ...prev, transmissionType: value ? value.label : '' }));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
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
                                    this.props.setItem(prev => ({ ...prev, condition: value ? value.label : '' }));
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
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
                                onChange={this.handleInputChange("location")}
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
                                rows={3} // Adjust rows to make it more compact
                                value={item.description}
                                onChange={this.handleInputChange("description")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <Typography variant="body2" gutterBottom>VIN</Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={item.vin}
                                onChange={this.handleInputChange("vin")}
                            />
                        </FormControl>
                    </Grid>
                    {/* Removed the Next button Grid item */}
                </Grid>
            </div>
        );
    }
}

export default CarDetailsDialog;
