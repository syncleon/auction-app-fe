import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios/index";
import {Vehicle} from "../models/IVehicle";

const VehicleDetailsForm = () => {
    const {id}: { id: string } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/vehicles/${id}`, {

            })
            .then((response) => {
                console.log(response.data)
                setVehicle(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vehicle data:', error);
            });
    }, [id]);
    return (
        <div className="vehicle-details">
            {vehicle && (
                <div>
                    <h1>{vehicle.year}, {vehicle.make}, {vehicle.model}</h1>

                    {vehicle.images.map((image, index) => (
                        <img
                            key={index}
                            src={`http://localhost:63958/${image}`}
                            alt={`${vehicle.make} Image ${index}`}
                            style={{
                                width: index === 0 ? '500px' : '200px',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VehicleDetailsForm;