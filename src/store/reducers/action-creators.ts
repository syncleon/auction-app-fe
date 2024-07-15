import {AuthActionCreators} from "./auth/action-creators";
import {AddItemActionCreators} from "./addItem/action-creators";

export const allActionCreators={
    ...AuthActionCreators, ...AddItemActionCreators
}