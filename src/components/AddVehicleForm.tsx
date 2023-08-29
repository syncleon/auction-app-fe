import React, { useState, useEffect } from "react";
import {
    Button,
    Container,
    Typography,
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { apiInstance } from "../axios-instance";
import { message } from "antd";
import { RouteNames } from "../routes";
import { useHistory } from "react-router-dom";

interface VehicleInfo {
    make: string;
    model: string;
    mileage: string;
    vin: string;
    year: string;
    expectedBid: string;
    damaged: boolean;
}

const AddVehicleForm: React.FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false); // Add success state
    const history = useHistory();
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
        make: "",
        model: "",
        mileage: "",
        vin: "",
        year: "",
        expectedBid: "",
        damaged: false,
    });

    const handleCreateVehicle = async (formData: FormData) => {
        if (files) {
            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }

            formData.append(
                "payload",
                JSON.stringify({
                    make: vehicleInfo.make,
                    model: vehicleInfo.model,
                    mileage: vehicleInfo.mileage,
                    vin: vehicleInfo.vin,
                    year: vehicleInfo.year,
                    expectedBid: vehicleInfo.expectedBid,
                })
            );

            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
                await apiInstance.post('vehicles', formData, {headers});
                setLoading(false);
                setSuccess(true); // Set success to true
                message.success('Car vehicle created successfully');
                // No need to redirect here, we'll redirect after rendering the success message
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (files) {
            const previews: string[] = [];

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
            }
        } else {
            setFilePreviews([]);
        }
    }, [files]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;

        setVehicleInfo((prevInfo) => ({
            ...prevInfo,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleUpload = async () => {
        // Include vehicleInfo in your upload logic as needed

        if (files) {

            const formData = new FormData();

            [...files].forEach((file) => {
                formData.append("files", file);
            });

            try {
                const result = await fetch("https://httpbin.org/post", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleAddVehicle = async () => {
        // Call handleCreateVehicle and pass the formData
        if (files) {
            const formData = new FormData();

            // ... (same code as before)

            try {
                await handleCreateVehicle(formData); // Call handleCreateVehicle here
                history.push(RouteNames.PROFILE); // Redirect after success
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container maxWidth="md">
            {/* Wrap the JSX elements in a parent element */}
            <Box display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-between">
                {/* Left Section - Vehicle Information */}
                <Box flex="1">
                    <TextField
                        label="Make"
                        name="make"
                        value={vehicleInfo.make}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={vehicleInfo.model}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Mileage"
                        name="mileage"
                        value={vehicleInfo.mileage}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="VIN"
                        name="vin"
                        value={vehicleInfo.vin}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={vehicleInfo.year}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Expected Bid"
                        name="expectedBid"
                        value={vehicleInfo.expectedBid}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={vehicleInfo.damaged}
                                onChange={handleInputChange}
                                name="damaged"
                            />
                        }
                        label="Damaged"
                    />
                </Box>

                {/* Right Section - File Input and Previews */}
                <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    {/* File input */}
                    <input
                        id="file"
                        type="file"
                        multiple
                        style={{display: "none"}}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file">
                        <Button variant="contained" component="span">
                            Choose Files
                        </Button>
                    </label>
                    {filePreviews.length > 0 && (
                        <Box textAlign="center" mt={2}>
                            {/* Conditionally render success message */}
                            {success ? (
                                <Typography variant="h6">Vehicle added successfully!</Typography>
                            ) : (
                                <Button
                                    variant="contained" // Use variant instead of type
                                    onClick={handleAddVehicle}
                                    disabled={loading} // Disable the button when loading
                                >
                                    Add Vehicle
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default AddVehicleForm;