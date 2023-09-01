import React, { useState, useEffect, ChangeEvent } from "react";
import { Autocomplete, Button, Container, Typography, Box, TextField, FormControlLabel, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { message } from "antd";
import { RouteNames } from "../routes";
import { useHistory } from "react-router-dom";
import { apiInstance } from "../axios-instance";
import vehicleMakersModels from "../models/VehicleMakersModels";

interface FilePreviewProps {
    preview: string;
    onClick: () => void;
    onDelete: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ preview, onClick, onDelete }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
            src={preview}
            alt="File Preview"
            style={{ maxWidth: '200px', maxHeight: '200px', margin: '5px', cursor: 'pointer' }}
            onClick={onClick}
        />
        <Button variant="contained" color="secondary" onClick={onDelete}>Delete</Button>
    </div>
);

interface PreviewDialogProps {
    open: boolean;
    onClose: () => void;
    selectedPreview: string | null;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ open, onClose, selectedPreview }) => (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogTitle>Full-Size Preview</DialogTitle>
        <DialogContent>
            {selectedPreview && (
                <img src={selectedPreview} alt="Full-Size Preview" style={{ width: '100%' }} />
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
);

interface VehicleInfo {
    make: string;
    model: string;
    mileage: string;
    vin: string;
    year: string;
    expectedBid: string;
    damaged: boolean;
}

const yearOptions = Array.from({ length: 50 }, (_, index) => (new Date().getFullYear() - index).toString());

const AddVehicleForm: React.FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<{ file: File, preview: string }[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [modelOptions, setModelOptions] = useState<string[]>([]);
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
        make: "",
        model: "",
        mileage: "",
        vin: "",
        year: "",
        expectedBid: "",
        damaged: false,
    });

    const isAddButtonDisabled = () => {
        return (
            !vehicleInfo.make ||
            !vehicleInfo.model ||
            !vehicleInfo.mileage ||
            !vehicleInfo.vin ||
            !vehicleInfo.year ||
            !vehicleInfo.expectedBid ||
            selectedFiles.length === 0
        );
    };

    const isMakeSelected = !!vehicleInfo.make; // Check if a make is selected

    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
    const history = useHistory();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: string = "text") => {
        const { name, value, checked } = e.target;

        setVehicleInfo((prevInfo) => ({
            ...prevInfo,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleMakeChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
        if (newValue !== null) {
            const selectedMake = newValue;
            setVehicleInfo({
                ...vehicleInfo,
                make: selectedMake,
                model: "", // Clear the selected model when the make changes
            });
            // Update the model options based on the selected make
            setModelOptions(vehicleMakersModels[selectedMake] || []);
        } else {
            // Handle the case when the make is cleared (optional)
            setVehicleInfo({
                ...vehicleInfo,
                make: "",
            });
            setModelOptions([]);
        }
    };

    const handleModelChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
        if (newValue !== null) {
            setVehicleInfo({
                ...vehicleInfo,
                model: newValue,
            });
        }
    };

    const handleYearChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
        if (newValue !== null) {
            setVehicleInfo({
                ...vehicleInfo,
                year: newValue,
            });
        }
    };

    const handleVinChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.slice(0, 17);

        setVehicleInfo({
            ...vehicleInfo,
            vin: newValue,
        });
    };

    const openPreviewDialog = (preview: string) => {
        setSelectedPreview(preview);
        setPreviewOpen(true);
    };

    const closePreviewDialog = () => {
        setSelectedPreview(null);
        setPreviewOpen(false);
    };

    const submitCreateVehicle = async () => {
        if (selectedFiles.length > 0) {
            const formData = new FormData();

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("images", selectedFiles[i].file);
            }

            const payloadData = {
                make: vehicleInfo.make,
                model: vehicleInfo.model,
                mileage: vehicleInfo.mileage,
                vin: vehicleInfo.vin,
                year: vehicleInfo.year,
                expectedBid: vehicleInfo.expectedBid,
            };

            formData.append("payload", new Blob([JSON.stringify(payloadData)], { type: "application/json" }));

            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                };

                await apiInstance.post('vehicles', formData, { headers });
                setLoading(false);
                setSuccess(true);
                message.success("Car vehicle created successfully");
                history.push(RouteNames.PROFILE);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (files) {
            const previews: string[] = [];
            const selected: { file: File, preview: string }[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                    if (e.target && e.target.result && typeof e.target.result === "string") {
                        previews.push(e.target.result);
                        if (previews.length === files.length) {
                            setFilePreviews(previews);
                        }
                    }
                };

                reader.readAsDataURL(file);

                selected.push({ file, preview: URL.createObjectURL(file) });
            }

            setSelectedFiles(selected);
        } else {
            setFilePreviews([]);
            setSelectedFiles([]);
        }
    }, [files]);

    const handleAddVehicle = async () => {
        if (files) {
            try {
                await submitCreateVehicle();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedPreviews = [...filePreviews];
        updatedPreviews.splice(index, 1);
        setFilePreviews(updatedPreviews);

        const updatedSelectedFiles = [...selectedFiles];
        updatedSelectedFiles.splice(index, 1);
        setSelectedFiles(updatedSelectedFiles);
    };



    return (
        <Container maxWidth="md" >
            <Box display="flex"
                 flexDirection="row"
                 alignItems="flex-start"
                 justifyContent="space-between">
                <Box
                    flex="1">
                    <Autocomplete
                        id="make-select"
                        options={Object.keys(vehicleMakersModels)}
                        value={vehicleInfo.make}
                        onChange={handleMakeChange}
                        renderInput={(params) => (
                            <TextField {...params}
                                       label="Make"
                                       variant="outlined"
                                       fullWidth />
                        )}
                        style={{ marginBottom: '16px', marginTop: '10px' }}
                    />
                    <Autocomplete
                        id="model-select"
                        options={modelOptions}
                        value={vehicleInfo.model}
                        onChange={handleModelChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Model"
                                variant="outlined"
                                fullWidth
                                disabled={!isMakeSelected} // Disable the field if make is not selected
                            />
                        )}
                        style={{ marginBottom: '16px' }}
                        disabled={!isMakeSelected} // Disable the whole Autocomplete component if make is not selected
                    />
                    <Autocomplete
                        id="year-select"
                        options={yearOptions}
                        value={vehicleInfo.year}
                        onChange={handleYearChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Year"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Mileage (km)"
                        name="mileage"
                        value={vehicleInfo.mileage}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        inputProps={{
                            maxLength: "8"
                        }}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="VIN"
                        variant="outlined"
                        fullWidth
                        required
                        value={vehicleInfo.vin}
                        onChange={handleVinChange}
                        inputProps={{
                            maxLength: 17
                        }}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Expected Bid ($)"
                        name="expectedBid"
                        value={vehicleInfo.expectedBid}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        style={{ marginBottom: '16px' }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={vehicleInfo.damaged}
                                onChange={(e) => handleInputChange(e, "checkbox")}
                                name="damaged"
                                color="primary"
                            />
                        }
                        label="Damaged"
                    />
                </Box>
                <Box
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <input
                        id="file"
                        type="file"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file">
                        <Button
                            variant="contained"
                            component="span"
                            style={{ marginBottom: '16px', marginTop: '10px' }}
                        >
                            Select Images
                        </Button>
                    </label>
                    {filePreviews.length > 0 ? (
                        <div>
                                {filePreviews.map((preview, index) => (
                                    <FilePreview
                                        key={index}
                                        preview={preview}
                                        onClick={() => openPreviewDialog(preview)}
                                        onDelete={() => handleDeleteImage(index)}
                                    />
                                ))}
                        </div>
                    ) : (
                        <Typography variant="h6">Select at least one image</Typography>
                    )}
                    {success ? (
                        <Typography variant="h6">Vehicle added successfully!</Typography>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleAddVehicle}
                            disabled={loading || isAddButtonDisabled()} // Disable the button based on the condition
                            style={{ marginTop: "10px" }}
                        >
                            Add Vehicle
                        </Button>
                    )}
                </Box>
            </Box>

            <PreviewDialog open={previewOpen} onClose={closePreviewDialog} selectedPreview={selectedPreview} />
        </Container>
    );
};

export default AddVehicleForm;
