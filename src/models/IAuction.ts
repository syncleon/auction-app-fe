export interface Auction {
    id: string;
    userId: number;
    itemId: string;
    auctionStatus: string;
    bids: any[];  // Assuming BidDto would be translated to an appropriate type
    currentHighestBid: number;
    expectedPrice: number;
    reservePrice: number | null;
    winningBidId: string | null;
    duration: string;
    startTime: number;
    endTime: number;
    bidCount: number;
    isExtended: boolean;
    isAutoExtendEnabled: boolean;
    autoExtendDuration: number;
}