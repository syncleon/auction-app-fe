import React, {useState} from 'react';
import {Item} from "../models/IItem";

const AddItemDialog = () => {

    const [item, setItem] = useState<Item>({
        id: "", images: [],
        make: "",
        model: "",
        mileage: 0,
        year: "",
        onAuction: false,
        isSold: false
    });

    return (
        <div>
            
        </div>
    );
};

export default AddItemDialog;