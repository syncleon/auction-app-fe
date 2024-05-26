import {
    AuthActionEnum,
    SetAuthAction,
    SetErrorAction,
    SetIsLoadingAction,
    SetSuccessAction,
    SetUserAction
} from "./types";
import {IUser} from "../../../models/IUsers";
import {AppDispatch} from "../../index";
import axios from "axios";
import {apiInstance} from "../../../axios-instance";
import {message} from "antd";


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

    setSuccess: (message: string): SetSuccessAction => ({
        type: AuthActionEnum.SET_SUCCESS,
        payload: message
    }),

    setError: (error: string): SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR,
        payload: error
    }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await apiInstance.post<{ token: string }>('signin', {
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
            dispatch(AuthActionCreators.setSuccess(`Welcome back, ${username}!`))
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(AuthActionCreators.setError('')); // Reset error state on successful login
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const statusText = error.response.data;
                dispatch(AuthActionCreators.setError(statusText));
            }
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false))
        message.info(`We hope you're will back :)`)
    },

    register: (username: string, email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await apiInstance.post<{ token: string }>('signup', {
                username: username,
                email: email,
                password: password,
            })
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
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const statusText = error.response.data;
                dispatch(AuthActionCreators.setError(statusText));
            }
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    }
}