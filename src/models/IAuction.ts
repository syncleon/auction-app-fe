import {Item} from "./IItem";

export interface Auction {
    id: string;
    userId: number;
    item: Item;
    bids: any[];
    currentMaxBid: number;
    expectedPrice: number;
    auctionStatus: string;
    startTime: number;
    endTime: number;
    isExtended: boolean;
    duration: string;
}
