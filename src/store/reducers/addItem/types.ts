import {Item} from "../../../models/IItem";

export interface ItemState {
    item: Item;
    itemError: string;
    itemIsLoading: boolean;
    itemSuccess: string
}

export enum ItemActionEnum {
    SET_ITEM = "SET_ITEM",
    SET_ITEM_ERROR = "SET_ITEM_ERROR",
    SET_ITEM_IS_LOADING = "SET_ITEM_IS_LOADING",
    SET_ITEM_IS_SUCCESS = "SET_ITEM_IS_SUCCESS"
}

export interface SetItemAction {
    type: ItemActionEnum.SET_ITEM,
    payload: Item
}

export interface SetItemErrorAction {
    type: ItemActionEnum.SET_ITEM_ERROR
    payload: string
}

export interface SetItemIsLoadingAction {
    type: ItemActionEnum.SET_ITEM_IS_LOADING
    payload: boolean
}

export interface SetItemSuccessAction {
    type: ItemActionEnum.SET_ITEM_IS_SUCCESS
    payload: string
}

export type ItemAction =
    SetItemAction |
    SetItemErrorAction |
    SetItemIsLoadingAction |
    SetItemSuccessAction