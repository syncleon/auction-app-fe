import React from "react";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Add from "../pages/Add";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean
}

export enum RouteNames{
    LOGIN = '/login',
    REGISTER = '/register',
    PROFILE = '/profile',
    HOME = '/',
    ADD = '/add',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.REGISTER, exact: true, component: Register},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROFILE, exact: true, component: Profile},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.ADD, exact: true, component: Add},
]
