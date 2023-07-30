import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUsers";
import {AppDispatch} from "../../index";
import axios from "axios";
import jwt, {JwtPayload} from 'jsonwebtoken'


export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER,
        payload: user
    }),
    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: auth
    }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload: isLoading
    }),
    setError: (error: string): SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR,
        payload: error
    }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await axios.post<{ token: string }>('http://localhost:8080/api/v1/signin', {
                username: username,
                password: password,
            });

            const token = response.data.token;
            const user: IUser = {
                username: username,
                password: password,
            };
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('token', token)
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setError('Error on login'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}