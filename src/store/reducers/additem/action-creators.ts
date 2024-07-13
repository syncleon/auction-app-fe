import { AppDispatch } from "../../index";
import { apiInstance } from "../../../axios-instance";
import { Item } from "../../../models/IItem";
import { ItemActionEnum, SetErrorAction, SetItemAction } from "./types";
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

    additem: (make: string, model: string, mileage: number, year: number, images: FileList | null) =>
        async (dispatch: AppDispatch) => {
            try {

                const payloadData = {
                    make: make,
                    model: model,
                    mileage: mileage,
                    year: year
                }
                const formData = new FormData();
                formData.append('images', images ? images[0] : '');
                formData.append("payload", new Blob([JSON.stringify(payloadData)], { type: "application/json" }));

                const token = localStorage.getItem("token");

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
                const response = await apiInstance.post<Item>(`items`, formData, {headers});
                const newItem: Item = response.data;

                let itemsInStorage = JSON.parse(localStorage.getItem('items') || '[]');

                itemsInStorage.push(newItem);
                localStorage.setItem('items', JSON.stringify(itemsInStorage));

                dispatch(AddItemActionCreators.setItem(newItem));

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const statusText = error.response.data;
                    dispatch(AddItemActionCreators.setError(statusText));
                }
            }
        }
};
