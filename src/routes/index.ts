import React from "react";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddVehicle from "../pages/AddVehicle";
import VehicleDetails from "../pages/VehicleDetails";
import Auctions from "../pages/Auctions";
import AuctionsDetails from "../pages/AuctionsDetails";

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
    VEHICLE_DETAILS = '/vehicles/:id',
    AUCTIONS = '/auctions',
    AUCTION_DETAILS = '/auctions/:id'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.REGISTER, exact: true, component: Register},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.LOGIN, exact: true, component: Login},
    {path: RouteNames.VEHICLE_DETAILS, exact: true, component: VehicleDetails},
    {path: RouteNames.AUCTIONS, exact: true, component: Auctions},
    {path: RouteNames.AUCTION_DETAILS, exact: true, component: AuctionsDetails}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROFILE, exact: true, component: Profile},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.ADD, exact: true, component: AddVehicle},
    {path: RouteNames.VEHICLE_DETAILS, exact: true, component: VehicleDetails},
    {path: RouteNames.AUCTIONS, exact: true, component: Auctions},
    {path: RouteNames.AUCTION_DETAILS, exact: true, component: AuctionsDetails}
]
