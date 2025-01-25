export interface Auction {
    id: string;
    userId: number;
    itemId: string;
    bids: any[];
    currentMaxBid: number;
    expectedPrice: number;
    auctionStatus: string;
    startTime: number;
    endTime: number;
    isExtended: boolean;
    duration: string;
}
