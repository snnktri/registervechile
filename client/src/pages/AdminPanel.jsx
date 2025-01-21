import React, { useState, useEffect } from 'react';
import { getAllDetails } from '../services/registerVehicleServices';

const AdminPanel = () => {
    const [datas, setDatas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRegDetails = async () => {
            setLoading(true);
            try {
                const data = await getAllDetails();
                console.log("I am from admin panel:");
                console.log(data);
                if (data) {
                    setDatas(data); // Assuming data contains registrationDetails object
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredRegistrations = datas?.registrations.filter((registration) => {
        return (
            registration.owner.firstName.toLowerCase().includes(searchTerm) ||
            registration.owner.email.toLowerCase().includes(searchTerm) ||
            registration.vehicle.registrationNumber.toLowerCase().includes(searchTerm) ||
            registration.registrationStatus.toLowerCase().includes(searchTerm)
        );
    });

    if (loading) {
        return <div className="text-white text-center py-12">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-12">{error}</div>;
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="mb-4 w-full flex justify-center">
                <input
                    type="text"
                    className="border p-2 w-1/2 mt-2 bg-gray-200 rounded-xl"
                    placeholder="Search by owner name, email, registration number, or status"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
           <div className='overflow-x-auto w-full'>
           <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Owner Name</th>
                        <th className="border border-gray-300 p-2">Registration Status</th>
                        
                        <th className="border border-gray-300 p-2">Owner Email</th>
                        <th className="border border-gray-300 p-2">Vehicle Registration Number</th>
                        <th className="border border-gray-300 p-2">Vehicle Model</th>
                        <th className="border border-gray-300 p-2">Registration Date</th>
                        <th className="border border-gray-300 p-2">Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRegistrations && filteredRegistrations.length > 0 ? (
                        filteredRegistrations.map((registration) => (
                            <tr key={registration._id}>
                                 <td className="border border-gray-300 p-2">{registration.owner.firstName}</td>
                                <td className="border border-gray-300 p-2">{registration.registrationStatus}</td>
                               
                                <td className="border border-gray-300 p-2">{registration.owner.email}</td>
                                <td className="border border-gray-300 p-2">{registration.vehicle.registrationNumber}</td>
                                <td className="border border-gray-300 p-2">{registration.vehicle.model}</td>
                                <td className="border border-gray-300 p-2">{new Date(registration.registrationDate).toLocaleDateString()}</td>
                                <td className="border border-gray-300 p-2">{new Date(registration.expiryDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="border border-gray-300 p-2 text-center">No matching records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
           </div>
        </div>
    );
};

export default AdminPanel;
