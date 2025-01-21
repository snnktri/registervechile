import React, { useEffect, useState } from 'react';
import { getDetails } from '../services/vehicleServices'; // Adjust import path as necessary

const VehicleDetails = () => {
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            setLoading(true);
            try {
                const data = await getDetails(); // Await the result here
                console.log(data);
                if (data) {
                    setVehicleDetails(data); // Set data if successful
                } else {
                    setError("Failed to fetch vehicle details.");
                }
            } catch (err) {
                setError("An error occurred while fetching details.");
            } finally {
                setLoading(false); // Turn off loading after operation finishes
            }
        };

        fetchVehicleDetails(); // Call the function
    }, []); // Empty dependency array to call it once when the component mounts

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Vehicle Details</h1>

            {vehicleDetails ? (
                <div className="space-y-8">
                    {/* User profile */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Owner Profile</h2>
                        <div className="flex items-center space-x-6">
                            {vehicleDetails.owner.photo ? (
                                <img 
                                    src={vehicleDetails.owner.photo} 
                                    alt="User Profile"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-white">No Photo</span>
                                </div>
                            )}
                            <div>
                                <p className="text-lg"><strong>Name:</strong> {vehicleDetails.owner.firstName}</p>
                                <p className="text-lg"><strong>Email:</strong> {vehicleDetails.owner.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle photo */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Vehicle Photo</h2>
                        {vehicleDetails.photo ? (
                            <img 
                                src={vehicleDetails.photo} 
                                alt="Vehicle" 
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="text-center text-gray-500">No vehicle photo available</div>
                        )}
                    </div>

                    {/* Vehicle details */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
                        <p><strong>Registration Number:</strong> {vehicleDetails.registrationNumber}</p>
                        <p><strong>VIN:</strong> {vehicleDetails.vin}</p>
                        <p><strong>Make:</strong> {vehicleDetails.make}</p>
                        <p><strong>Model:</strong> {vehicleDetails.model}</p>
                        <p><strong>Year:</strong> {new Date(vehicleDetails.year).getFullYear()}</p>
                        <p><strong>Engine Number:</strong> {vehicleDetails.engineNumber}</p>
                        <p><strong>Color:</strong> {vehicleDetails.color}</p>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">No vehicle details available</div>
            )}
        </div>
    );
};

export default VehicleDetails;
