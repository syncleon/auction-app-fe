import React from "react";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Add from "../pages/Add";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean
}

export enum RouteNames{
    PROFILE = '/profile',
    HOME = '/',
    ADD = '/add',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, exact: true, component: Home},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROFILE, exact: true, component: Profile},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.ADD, exact: true, component: Add},
]
