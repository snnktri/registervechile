import React, { useState } from "react";
import { vehilceReg } from "../services/vehicleServices";
import { useNavigate } from "react-router-dom";

const Vehicle = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    vin: "",
    model: "",
    color: "",
    year: "",
    engineNumber: "",
    make: "",
    registrationDate: "",
    photo: null,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success message state

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const registrationDate = new Date(formData.registrationDate);

    // Prepare the data to be sent to the backend
    const vehicleData = {
      ...formData,
      registrationDate, // Ensure registrationDate is in Date format
    };

    try {
      const res = await vehilceReg(vehicleData);
      
      // Redirect to another page after successful submission

      if(res.success) {
        setSuccess("Vehicle registered successfully!"); // Show success message
      setFormData({
        registrationNumber: "",
        vin: "",
        model: "",
        color: "",
        year: "",
        engineNumber: "",
        make: "",
        registrationDate: "",
        photo: null, // Reset the form after submission
      });

      navigate("/reg-vech");
      }
    } catch (error) {
      setError("Failed to register vehicle. Please try again!"); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-screen h-auto flex items-center flex-col bg-gray-600 py-12 px-6">
      <h2 className="text-white text-2xl mb-6">Add Vehicle Information</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6"
      >
        {/* Registration Number */}
        <div className="mb-4">
          <label className="text-white">Registration Number:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* VIN */}
        <div className="mb-4">
          <label className="text-white">VIN:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            required
          />
        </div>

        {/* Model */}
        <div className="mb-4">
          <label className="text-white">Model:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>

        {/* Color */}
        <div className="mb-4">
          <label className="text-white">Color:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="text-white">Year:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        {/* Engine Number */}
        <div className="mb-4">
          <label className="text-white">Engine Number:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="text"
            name="engineNumber"
            value={formData.engineNumber}
            onChange={handleChange}
          />
        </div>

        {/* Make */}
        <div className="mb-4">
          <label className="text-white">Make:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </div>

        {/* Registration Date */}
        <div className="mb-4">
          <label className="text-white">Registration Date:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Vehicle Photo */}
        <div className="mb-4">
          <label className="text-white">Picture of Vehicle:</label>
          <input
            className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Success and Error Messages */}
      {error && (
        <div className="text-red-500 mt-4 p-3 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 mt-4 p-3 bg-green-100 rounded-md">
          {success}
        </div>
      )}
    </div>
  );
};

export default Vehicle;
