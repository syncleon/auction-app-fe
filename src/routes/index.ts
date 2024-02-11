import React from "react";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddVehicle from "../pages/AddVehicle";
import VehicleDetails from "../pages/VehicleDetails";
import AddedVehicles from "../pages/AddedVehicles";
import PastAuctions from "../pages/PastAuctions";

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
    ADDED_VEHICLES = '/added-vehicles',
    PAST_AUCTIONS = '/past-auctions'

}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.REGISTER, exact: true, component: Register},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.LOGIN, exact: true, component: Login},
    {path: RouteNames.VEHICLE_DETAILS, exact: true, component: VehicleDetails},
    {path: RouteNames.ADDED_VEHICLES, exact: true, component: AddedVehicles},
    {path: RouteNames.PAST_AUCTIONS, exact: true, component: PastAuctions}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROFILE, exact: true, component: Profile},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.ADD, exact: true, component: AddVehicle},
    {path: RouteNames.VEHICLE_DETAILS, exact: true, component: VehicleDetails},
    {path: RouteNames.ADDED_VEHICLES, exact: true, component: AddedVehicles},
    {path: RouteNames.PAST_AUCTIONS, exact: true, component: PastAuctions}
]
