import React, { useState } from 'react';
import { registerUser } from "../services/userServices.js";
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    nagriktaNumber: "",
    profile: null,
    state: "",
    district: "",
    role: "user",  // This will hold either 'user' or 'admin' role
  });

  const [error, setError] = useState(null);  // Error state
  const [success, setSuccess] = useState(null);  // Success state
  const navigate = useNavigate();

  // Generic input handler for all fields
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null); 

    // Validate that the role is selected
    if (!formData.role) {
      setError("Please select a role.");
      return; // Prevent form submission if role is not selected
    }

    try {
      // Perform user registration
      const data = await registerUser(formData);

      if (data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          nagriktaNumber: "",
          profile: null,
          state: "",
          district: "",
          role: "", // Reset role
        });
        setTimeout(() => navigate("/user-login"), 2000);  // Redirect after 2 seconds
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-600 py-12 px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-white text-xl text-center mb-6">Enter your details to sign up</h2>
        
        {/* Display error or success messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-white">First Name:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-white">Last Name:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-white">Email:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-white">Password:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-white">Phone Number:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nagriktaNumber" className="text-white">Nagrikta Number:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="text"
              name="nagriktaNumber"
              placeholder="Nagrikta Number"
              value={formData.nagriktaNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="profile" className="text-white">Profile Picture:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="file"
              name="profile"
              accept="image/*" // Allows only image files
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="district" className="text-white">District:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="text"
              name="district"
              placeholder="District Name"
              value={formData.district}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="text-white">State:</label>
            <input
              className="border mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="text"
              name="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-white block mb-2">Role:</label>
            <select
              name="role"  // Corrected this to match the formData field name
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
