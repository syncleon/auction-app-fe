import {Item} from "../../../models/IItem";

export interface ItemState {
    item: Item,
    error: string
}

export enum ItemActionEnum {
    SET_ITEM = "SET_ITEM",
    SET_ERROR = "SET_ERROR"
}

export interface SetItemAction {
    type: ItemActionEnum.SET_ITEM,
    payload: Item
}

export interface SetErrorAction {
    type: ItemActionEnum.SET_ERROR
    payload: string
}

export type ItemAction =
    SetItemAction | SetErrorAction
