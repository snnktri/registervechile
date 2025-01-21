import React, { useState } from 'react';
import { regVehilesToOFfice } from "../services/registerVehicleServices";
import { useNavigate } from 'react-router-dom';

const VehicleRegistration = () => {
  const [regDetails, setRegDetails] = useState({
    registrationDate: "",
    expiryDate: "",
    status: "active",
    registrationStatus: "pending"
  });

  const navigate = useNavigate();

  // Handle change of input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedRegistrationDate = regDetails.registrationDate
      ? new Date(regDetails.registrationDate).toISOString()
      : '';
    
    const formattedExpiryDate = regDetails.expiryDate
      ? new Date(regDetails.expiryDate).toISOString()
      : '';

    const formattedDetails = {
      ...regDetails,
      registrationDate: formattedRegistrationDate,
      expiryDate: formattedExpiryDate,
    };

    try {
      // Register vehicle using the formatted details
      const res = await regVehilesToOFfice(formattedDetails);
      console.log('Registration successful: ', res);

      if (res.success) {
        alert('Vehicle registration successful!');
        setRegDetails({ // Reset form fields after successful registration
          registrationDate: "",
          expiryDate: "",
          status: "active",
          registrationStatus: "pending",
        });
        navigate("/")
      }
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  };

  return (
    <div className="w-screen h-auto flex items-center flex-col bg-gray-600 py-12 px-6">
      <h2 className="text-white text-2xl mb-6">Enter the details for registration</h2>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        
        <div className="mb-6">
          <label className="text-white block mb-2">Registration Date:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="date" // Date input for easier date selection
            name="registrationDate"
            value={regDetails.registrationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-white block mb-2">Expiry Date:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="date" // Date input for easier date selection
            name="expiryDate"
            value={regDetails.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-white block mb-2">Status:</label>
          <select
            name="status"
            value={regDetails.status}
            onChange={handleChange}
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
          >
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-white block mb-2">Registration Status:</label>
          <select
            name="Regstatus"
            value={regDetails.registrationStatus}
            onChange={handleChange}
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
          >
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VehicleRegistration;
