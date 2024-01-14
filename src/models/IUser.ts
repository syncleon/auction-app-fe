import {Vehicle} from "./IVehicle";
import {Auction} from "./IAuction";
import {Bid} from "./IBid";

export interface User {
    id: number;
    username: string;
    email: string;
    vehicles: Vehicle[];
    auctions: Auction[];
    bid: Bid[]
}