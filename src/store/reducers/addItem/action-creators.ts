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

    addItem: (make: string, model: string, mileage: number, year: number, images: FileList | null) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(AddItemActionCreators.setItemIsLoading(true));

                const payloadData = {
                    make: make,
                    model: model,
                    mileage: mileage,
                    year: year
                };

                const formData = new FormData();
                formData.append('images', images ? images[0] : '');
                formData.append("payload", new Blob([JSON.stringify(payloadData)], {type: "application/json"}));

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
                    const statusText = error.response.data.message;
                    dispatch(AddItemActionCreators.setItemIsError(statusText));
                }
            } finally {
                dispatch(AddItemActionCreators.setItemIsLoading(false));
            }
        }
};
