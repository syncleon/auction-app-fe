import {AppDispatch} from "../../index";
import {apiInstance} from "../../../axios-instance";
import {Item} from "../../../models/IItem";
import {ItemActionEnum, SetErrorAction, SetItemAction} from "./types";
import axios from "axios";


export const AddItemActionCreators = {
    setItem: (item: Item): SetItemAction => ({
        type: ItemActionEnum.SET_ITEM,
        payload: item
    }),

    setError: (error: string): SetErrorAction => ({
        type: ItemActionEnum.SET_ERROR,
        payload: error
    }),

    additem: (make: string, model: string, mileage: number, year: number, images: []) =>
        async (dispatch: AppDispatch) => {
        try {
        const response = await apiInstance.post<{ token: string }>('items', {
            make: make,
            model: model,
            mileage: mileage,
            year: year,
            images: images
        });

        const item: Item = {
            id: "",
            isSold: false,
            onAuction: false,
            make: make,
            model: model,
            mileage: mileage,
            year: year,
            images: images
        };
        localStorage.setItem('items', JSON.stringify(item));
        dispatch(AddItemActionCreators.setItem(item))
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const statusText = error.response.data;
            dispatch(AddItemActionCreators.setError(statusText));
        }
    }
}
}