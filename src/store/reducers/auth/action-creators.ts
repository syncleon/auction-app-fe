import {
    AuthActionEnum,
    SetAuthAction,
    SetAuthErrorAction,
    SetAuthIsLoadingAction,
    SetAuthSuccessAction,
    SetUserAction
} from "./types";
import { IUser } from "../../../models/IUsers";
import { AppDispatch } from "../../index";
import axios from "axios";
import { message } from "antd";
import { API_ENDPOINTS } from "../../../apiService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER,
        payload: user
    }),
    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: auth
    }),
    setAuthIsLoading: (authIsLoading: boolean): SetAuthIsLoadingAction => ({
        type: AuthActionEnum.SET_AUTH_LOADING,
        payload: authIsLoading
    }),

    setAuthIsSuccess: (authMessage: string): SetAuthSuccessAction => ({
        type: AuthActionEnum.SET_AUTH_IS_SUCCESS,
        payload: authMessage
    }),

    setAuthIsError: (authError: string): SetAuthErrorAction => ({
        type: AuthActionEnum.SET_AUTH_ERROR,
        payload: authError
    }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setAuthIsLoading(true));
            const response = await axios.post<{ token: string }>(API_ENDPOINTS.SIGN_IN, {
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
            localStorage.setItem('token', token);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setAuthIsLoading(false));
            dispatch(AuthActionCreators.setAuthIsSuccess(`Welcome back, ${username}!`));
            dispatch(AuthActionCreators.setAuthIsError('')); // Reset error state on successful login
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const statusText = error.response.data;
                dispatch(AuthActionCreators.setAuthIsError(statusText));
            }
        } finally {
            dispatch(AuthActionCreators.setAuthIsLoading(false));
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
        message.info(`Hope you're will return :)`);
    },

    register: (username: string, email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setAuthIsLoading(true));
            const response = await axios.post<{ token: string }>(API_ENDPOINTS.SIGNUP, {
                username: username,
                email: email,
                password: password,
            });
            const token = response.data.token;
            const user: IUser = {
                username: username,
                password: password,
            };
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('token', token);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setAuthIsLoading(false));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const statusText = error.response.data;
                dispatch(AuthActionCreators.setAuthIsError(statusText));
            }
        } finally {
            dispatch(AuthActionCreators.setAuthIsLoading(false));
        }
    }
};
