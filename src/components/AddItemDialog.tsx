import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useActions} from "../hooks/useActions";
import {RouteNames} from "../routes";
import {useHistory} from "react-router-dom"; // Assuming Redux is used for state management

const AddItemDialog = () => {
    const dispatch = useDispatch();

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState(0);
    const [year, setYear] = useState(0);
    const [images, setImages] = useState<FileList | null>(null);
    const { additem } = useActions();
    const history = useHistory();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Dispatch additem action creator with form values
       additem(make, model, mileage, year, images);
        // Clear form or perform other actions after submission
        clearForm();
        history.push(RouteNames.PROFILE);
    };

    const clearForm = () => {
        setMake('');
        setModel('');
        setMileage(0);
        setYear(0);
        setImages(null);
    };

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
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItemDialog;
