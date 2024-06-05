export interface Item {
    id: string;
    make: string;
    model: string;
    mileage: number;
    year: number;
    images: string[];
    onAuction: boolean;
    isSold: boolean
}