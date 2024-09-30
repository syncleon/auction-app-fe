import React, { useState, useEffect } from 'react';
import { useActions } from "../hooks/useActions";
import { RouteNames } from "../routes";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CircularProgress } from "@mui/material";
import { message } from "antd";

const AddItemDialog = () => {
    const { itemError, itemSuccess, itemIsLoading } = useTypedSelector(state => state.addItem);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState(0);
    const [year, setYear] = useState(0);
    const [featuredImages, setFeaturedImages] = useState<FileList | null>(null);
    const [exteriorImages, setExteriorImages] = useState<FileList | null>(null);
    const [interiorImages, setInteriorImages] = useState<FileList | null>(null);
    const [mechanicalImages, setMechanicalImages] = useState<FileList | null>(null);
    const [otherImages, setOtherImages] = useState<FileList | null>(null);
    const { addItem, setItemSuccess, setItemIsError } = useActions();
    const navigate = useNavigate();

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
        setMileage(0);
        setYear(0);
        setFeaturedImages(null);
        setExteriorImages(null);
        setInteriorImages(null);
        setMechanicalImages(null);
        setOtherImages(null);
    };

    // Updated validation to check for featured images
    const isFormValid = make && model && mileage > 0 && year > 0 && (featuredImages ? featuredImages.length > 0 : false);

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
                    <label>Featured Images:</label>
                    <input type="file" multiple onChange={(e) => setFeaturedImages(e.target.files)} />
                </div>
                <div>
                    <label>Exterior Images:</label>
                    <input type="file" multiple onChange={(e) => setExteriorImages(e.target.files)} />
                </div>
                <div>
                    <label>Interior Images:</label>
                    <input type="file" multiple onChange={(e) => setInteriorImages(e.target.files)} />
                </div>
                <div>
                    <label>Mechanical Images:</label>
                    <input type="file" multiple onChange={(e) => setMechanicalImages(e.target.files)} />
                </div>
                <div>
                    <label>Other Images:</label>
                    <input type="file" multiple onChange={(e) => setOtherImages(e.target.files)} />
                </div>
                <button type="submit" disabled={!isFormValid}>Add Item</button>
                {itemIsLoading && <CircularProgress />}
            </form>
        </div>
    );
};

export default AddItemDialog;
