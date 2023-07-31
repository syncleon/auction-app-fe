import {Vehicle} from "./IVehicle";

export interface User {
    id: number;
    username: string;
    email: string;
    vehicles: Vehicle[];
}