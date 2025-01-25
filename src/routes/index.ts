import React from "react";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import AddItem from "../pages/AddItem";
import ItemDetails from "../pages/ItemDetails";
import PastAuctions from "../pages/PastAuctions";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean
}

export enum RouteNames{
    PROFILE = '/profile',
    HOME = '/',
    ADD = '/add',
    ITEM_DETAILS = '/items/:id',
    PAST_AUCTIONS = '/past-auctions'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.ITEM_DETAILS, exact: true, component: ItemDetails},
    {path: RouteNames.PAST_AUCTIONS, exact: true, component: PastAuctions},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROFILE, exact: true, component: Profile},
    {path: RouteNames.HOME, exact: true, component: Home},
    {path: RouteNames.ADD, exact: true, component: AddItem},
    {path: RouteNames.ITEM_DETAILS, exact: true, component: ItemDetails},
    {path: RouteNames.PAST_AUCTIONS, exact: true, component: PastAuctions},
]
