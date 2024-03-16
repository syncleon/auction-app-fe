export interface Vehicle {
    id: number;
    make: string;
    model: string;
    mileage: number;
    vin: string;
    year: string;
    expectedBid: number;
    damaged: boolean;
    sellerId: number;
    sellerUsername: string;
    images: string[];
    deleted: boolean,
    onSale: boolean,
    isSold: boolean,
    auctionAdded: boolean
}

