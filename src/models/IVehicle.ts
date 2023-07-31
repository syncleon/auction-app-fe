export interface Vehicle {
    id: number;
    producer: string;
    model: string;
    mileage: number;
    vin: string;
    year: string;
    engine: string;
    drivetrain: string;
    transmission: string;
    bodyStyle: string;
    exteriorColor: string;
    interiorColor: string;
    sellerType: string;
    highlights: string;
    expectedBid: number;
    damaged: boolean;
    sellerId: number;
}