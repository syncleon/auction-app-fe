import { AppDispatch } from "../../index";
import { API_ENDPOINTS } from "../../../apiService";
import { Item } from "../../../models/IItem";
import axios from "axios";
import {
    ItemActionEnum,
    SetItemErrorAction,
    SetItemIsLoadingAction,
    SetItemAction,
    SetItemSuccessAction
} from "./types";

export const AddItemActionCreators = {
    setItem: (item: Item): SetItemAction => ({
        type: ItemActionEnum.SET_ITEM,
        payload: item
    }),

    setItemIsLoading: (itemIsLoading: boolean): SetItemIsLoadingAction => ({
        type: ItemActionEnum.SET_ITEM_IS_LOADING,
        payload: itemIsLoading
    }),

    setItemIsError: (itemError: string): SetItemErrorAction => ({
        type: ItemActionEnum.SET_ITEM_ERROR,
        payload: itemError
    }),

    setItemSuccess: (itemMessage: string): SetItemSuccessAction => ({
        type: ItemActionEnum.SET_ITEM_IS_SUCCESS,
        payload: itemMessage
    }),

    addItem: (
        make: string,
        model: string,
        mileage: string,
        year: string,
        price: string,  // Added price
        color: string,   // Added color
        engineSize: string, // Added engineSize
        fuelType: string, // Added fuelType
        transmissionType: string, // Added transmissionType
        condition: string, // Added condition
        location: string, // Added location
        description: string, // Added description
        vin: string, // Added vin
        images: { featured: FileList | null, exterior: FileList | null, interior: FileList | null, mechanical: FileList | null, other: FileList | null }
    ) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AddItemActionCreators.setItemIsLoading(true));

            const payloadData = {
                make,
                model,
                mileage,
                year,
                price,  // Include price in the payload
                color,   // Include color in the payload
                engineSize, // Include engineSize in the payload
                fuelType, // Include fuelType in the payload
                transmissionType, // Include transmissionType in the payload
                condition, // Include condition in the payload
                location, // Include location in the payload
                description, // Include description in the payload
                vin // Include vin in the payload
            };

            const formData = new FormData();

            // Add payload data as JSON blob
            formData.append("payload", new Blob([JSON.stringify(payloadData)], { type: "application/json" }));

            // Append each category of images
            for (const [category, files] of Object.entries(images)) {
                if (files) {
                    for (let i = 0; i < files.length; i++) {
                        formData.append(`images_${category}`, files[i]);
                    }
                }
            }

            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };

            const response = await axios.post<Item>(API_ENDPOINTS.ITEMS, formData, { headers });
            const newItem: Item = response.data;

            dispatch(AddItemActionCreators.setItem(newItem));
            dispatch(AddItemActionCreators.setItemSuccess('Item Added Successfully!'));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const statusText = error.response.data;
                dispatch(AddItemActionCreators.setItemIsError(statusText));
            }
        } finally {
            dispatch(AddItemActionCreators.setItemIsLoading(false));
        }
    }
};
