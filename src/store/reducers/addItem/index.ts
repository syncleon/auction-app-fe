import {ItemAction, ItemActionEnum, ItemState} from "./types";
import {Item} from "../../../models/IItem";

const initialState: ItemState = {
    itemError: '',
    itemSuccess: '',
    itemIsLoading: false,
    item: {} as Item,
}

export default function itemReducers(state=initialState, action: ItemAction): ItemState {
    switch (action.type){
        case ItemActionEnum.SET_ITEM:
            return {...state, item: action.payload, itemIsLoading: false}
        case ItemActionEnum.SET_ITEM_ERROR:
            return {...state, itemError: action.payload}
        case ItemActionEnum.SET_ITEM_IS_LOADING:
            return {...state, itemIsLoading: action.payload}
        case ItemActionEnum.SET_ITEM_IS_SUCCESS:
            return {...state, itemSuccess: action.payload}
        default:
            return state;
    }
}