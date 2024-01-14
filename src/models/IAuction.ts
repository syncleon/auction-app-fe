import {Vehicle} from "./IVehicle";
import {Bid} from "./IBid";

export interface Auction {
    id: number;
    auctionOwner: string;
    vehicle: Vehicle;
    reservedPrice: number;
    auctionStatus: string;
    startTime: string;
    endTime: string;
    bids: Bid[];
    currentMaxBid: number;
    currentMaxBidderId: number;
    timeLeft: string
}