import React, { useState, useEffect } from 'react';
import { getDetails } from '../services/registerVehicleServices';

const RegDetails = () => {
    const [regDetails, setRegDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegDetails = async () => {
            setLoading(true);
            try {
                const data = await getDetails();
                console.log(data);
                if (data) {
                    setRegDetails(data); // Assuming data contains registrationDetails object
                } else {
                    setError("Failed to fetch registration details.");
                }
            } catch (err) {
                setError("An error occurred while fetching details.");
            } finally {
                setLoading(false);
            }
        };
        fetchRegDetails();
    }, []);

    if (loading) {
        return <div className="text-white text-center py-12">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-12">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-800 py-12 px-6">
            <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-lg p-6 space-y-6">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">Registration Details</h2>
                
                <div className="space-y-4">
                    {/* Owner Photo */}
                    <div className="flex items-center space-x-4 mb-6">
                        {regDetails?.registrationDetails?.owner?.profile ? (
                            <img 
                                src={regDetails?.registrationDetails?.owner?.profile} 
                                alt="Owner" 
                                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-white">No Photo</span>
                            </div>
                        )}
                        <div>
                            <p className="text-white text-lg font-semibold">
                                {regDetails?.registrationDetails?.owner?.firstName} {regDetails?.registrationDetails?.owner?.lastName}
                            </p>
                        </div>
                    </div>

                    {/* Vehicle Photo */}
                    <div className="mb-6">
                        {regDetails?.registrationDetails?.vehicle?.photo ? (
                            <img 
                                src={regDetails?.registrationDetails?.vehicle?.photo} 
                                alt="Vehicle" 
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="text-center text-gray-500">No vehicle photo available</div>
                        )}
                    </div>

                    {/* Vehicle Information */}
                    <p className="text-white"><strong>Vehicle Number:</strong> {regDetails?.registrationDetails?.vehicle?.registrationNumber}</p>
                    <p className="text-white"><strong>Vehicle Model:</strong> {regDetails?.registrationDetails?.vehicle?.model}</p>
                    <p className="text-white"><strong>Vehicle Make:</strong> {regDetails?.registrationDetails?.vehicle?.make}</p>
                    <p className="text-white"><strong>Engine Number:</strong> {regDetails?.registrationDetails?.vehicle?.engineNumber}</p>
                    <p className="text-white"><strong>Chassis Number:</strong> {regDetails?.registrationDetails?.vehicle?.chassisNumber}</p>
                    <p className="text-white"><strong>Vehicle Color:</strong> {regDetails?.registrationDetails?.vehicle?.color}</p>

                    {/* Owner Information */}
                    <p className="text-white"><strong>Owner Name:</strong> {regDetails?.registrationDetails?.owner?.firstName} {regDetails?.registrationDetails?.owner?.lastName}</p>
                    <p className="text-white"><strong>Owner Email:</strong> {regDetails?.registrationDetails?.owner?.email}</p>

                    {/* Registration Dates */}
                    <p className="text-white"><strong>Registration Date:</strong> {new Date(regDetails?.registrationDetails?.registrationDate).toLocaleDateString()}</p>
                    <p className="text-white"><strong>Expiry Date:</strong> {new Date(regDetails?.registrationDetails?.expiryDate).toLocaleDateString()}</p>
                    
                    {/* Status */}
                    <p className="text-white"><strong>Status:</strong> {regDetails?.registrationDetails?.status}</p>
                    <p className="text-white"><strong>Rgistratin Status:</strong> {regDetails?.registrationDetails?.registrationStatus}</p>
                </div>
            </div>
        </div>
    );
};

export default RegDetails;
