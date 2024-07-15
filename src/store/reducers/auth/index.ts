import {AuthAction, AuthActionEnum, AuthState} from "./types";
import {IUser} from "../../../models/IUsers";


const initialState: AuthState = {
    isAuth: false,
    authError: '',
    authSuccess: '',
    authIsLoading: false,
    user: {} as IUser
}

export default function authReducer(state=initialState, action: AuthAction): AuthState {
    switch (action.type){
        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload, authIsLoading: false}
        case AuthActionEnum.SET_AUTH_ERROR:
            return {...state, authError: action.payload}
        case AuthActionEnum.SET_AUTH_IS_SUCCESS:
            return {...state, authSuccess: action.payload}
        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload, authIsLoading: false}
        case AuthActionEnum.SET_AUTH_LOADING:
            return {...state, authIsLoading: action.payload}
        default:
            return state;
    }

}