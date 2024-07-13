import {AuthActionCreators} from "./auth/action-creators";
import {AddItemActionCreators} from "./additem/action-creators";


export const allActionCreators={
    ...AuthActionCreators, ...AddItemActionCreators
}