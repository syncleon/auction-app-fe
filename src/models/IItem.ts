import {Auction} from "./IAuction";

export interface Item {
    id: string;
    make: string;
    model: string;
    mileage: string;
    year: string;
    price: number;
    exteriorColor: string;
    interiorColor: string;
    engineSize: string;
    fuelType: string;
    transmission: string;
    condition: string;
    drivetrain: string;
    bodyStyle: string;
    location: string;
    description: string;
    vin: string;
    onAuction: boolean;
    isSold: boolean;
    imagesFeatured: string[];
    imagesExterior: string[];
    imagesInterior: string[];
    imagesMechanical: string[];
    imagesOther: string[];
    userId: number;
    username: string;
    auction?: Auction;
}