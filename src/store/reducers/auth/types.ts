import {IUser} from "../../../models/IUsers";


export interface AuthState {
    isAuth: boolean;
    user: IUser;
    authIsLoading: boolean;
    authError: string;
    authSuccess: string
}

export enum AuthActionEnum {
    SET_AUTH = "SET_AUTH",
    SET_AUTH_IS_SUCCESS = "SET_AUTH_IS_SUCCESS",
    SET_AUTH_ERROR = "SET_AUTH_ERROR",
    SET_USER = "SET_USER",
    SET_AUTH_LOADING = "SET_AUTH_LOADING"
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH
    payload: boolean
}

export interface SetAuthSuccessAction {
    type: AuthActionEnum.SET_AUTH_IS_SUCCESS
    payload: string
}

export interface SetAuthErrorAction {
    type: AuthActionEnum.SET_AUTH_ERROR
    payload: string
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER
    payload: IUser
}

export interface SetAuthIsLoadingAction {
    type: AuthActionEnum.SET_AUTH_LOADING
    payload: boolean
}

export type AuthAction =
    SetAuthAction |
    SetAuthSuccessAction |
    SetAuthErrorAction |
    SetUserAction |
    SetAuthIsLoadingAction

