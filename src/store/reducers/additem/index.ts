import {ItemAction, ItemActionEnum, ItemState} from "./types";
import {Item} from "../../../models/IItem";

const initialState: ItemState = {
    error: '',
    item: {} as Item
}

export default function itemReducer(state=initialState, action: ItemAction): ItemState {
    switch (action.type){
        case ItemActionEnum.SET_ITEM:
            return {...state, item: action.payload}
        case ItemActionEnum.SET_ERROR:
            return {...state, error: action.payload}
        default:
            return state;
    }
}