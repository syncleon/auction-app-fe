import {IUser} from "../../../models/IUsers";


export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string,
    success: string
}

export enum AuthActionEnum {
    SET_AUTH = "SET_AUTH",
    SET_SUCCESS = "SET_SUCCESS",
    SET_ERROR = "SET_ERROR",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING"
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH
    payload: boolean
}

export interface SetSuccessAction {
    type: AuthActionEnum.SET_SUCCESS
    payload: string
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR
    payload: string
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER
    payload: IUser
}

export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING
    payload: boolean
}

export type AuthAction =
    SetAuthAction |
    SetSuccessAction |
    SetErrorAction |
    SetUserAction |
    SetIsLoadingAction

