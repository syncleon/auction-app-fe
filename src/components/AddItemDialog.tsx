import React, { useState, useEffect } from 'react';
import { useActions } from "../hooks/useActions";
import { RouteNames } from "../routes";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { message } from "antd";

const AddItemDialog = () => {
    const { itemError, itemSuccess, itemIsLoading } = useTypedSelector(state => state.addItem);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState(0);
    const [year, setYear] = useState(0);
    const [images, setImages] = useState<FileList | null>(null);
    const { addItem, setItemSuccess, setItemIsError } = useActions();
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    useEffect(() => {
        if (itemSuccess) {
            message.success(itemSuccess);
            clearForm();
            navigate(RouteNames.PROFILE); // Use navigate instead of history.push
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
        addItem(make, model, mileage, year, images);
    };

    const clearForm = () => {
        setMake('');
        setModel('');
        setMileage(0);
        setYear(0);
        setImages(null);
    };

    const isFormValid = make && model && mileage > 0 && year > 0;

    return (
        <div>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Make:</label>
                    <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
                </div>
                <div>
                    <label>Model:</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                </div>
                <div>
                    <label>Mileage:</label>
                    <input type="number" value={mileage} onChange={(e) => setMileage(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Year:</label>
                    <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Images:</label>
                    <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
                </div>
                {itemError && (
                    <Grid item>
                        <Typography variant="body2" color="error">
                            {itemError}
                        </Typography>
                    </Grid>
                )}
                <button type="submit" disabled={!isFormValid}>Add Item</button>
                {itemIsLoading && <CircularProgress />}
            </form>
        </div>
    );
};

export default AddItemDialog;
