// import React, { useState } from 'react';
// import { logIn } from "../services/userServices.js";
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

  
//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
     
//       const response = await logIn(data);

      
//       if (response.success) {
//         console.log('Login successful:', response);
//         console.log(response.message.accessToken);

//         localStorage.setItem("accessToken", response.message.accessToken);
//         setData({
//           email: "",
//           password: "",
//         });
//         navigate('/register-vehicle');
//       }
//     } catch (error) {
//       console.error('Login failed:', error); 
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-600 py-12 px-6">
      
//       <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
//         <p className="text-white text-center mb-6">
//           Welcome to the E-Governance Vehicle Registration Service Portal.
//           <br />Please enter your valid email and password to login.
//         </p>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-white">Email:</label>
//             <input
//               id="email"
//               className="border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={data.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="password" className="text-white">Password:</label>
//             <input
//               id="password"
//               className="border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={data.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default UserLogin;

import React, { useState } from 'react';
import { logIn } from "../services/userServices.js";
import { adminLogin } from "../services/adminServices.js"; // Import the adminLogin function
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    userType: "user", // Default to 'user' login type
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      // Use userLogin or adminLogin based on the selected userType
      if (data.userType === 'user') {
        response = await logIn(data);
      } else if (data.userType === 'admin') {
        response = await adminLogin(data);
      }

      if (response.success) {
        console.log('Login successful:', response);
        console.log(response.message.accessToken);

        localStorage.setItem("accessToken", response.message.accessToken);
        setData({
          email: "",
          password: "",
          userType: "user", // Reset userType to 'user' after successful login
        });

        // Redirect to appropriate dashboard
        if (data.userType === 'user') {
          navigate('/user');
        } else {
          navigate('/admin-panel'); // Replace with your admin dashboard route
        }
      }
    } catch (error) {
      console.error('Login failed:', error); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-600 py-12 px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <p className="text-white text-center mb-6">
          Welcome to the E-Governance Vehicle Registration Service Portal.
          <br />Please enter your valid email and password to login.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select User Type */}
          <div className="flex flex-col">
            <label htmlFor="userType" className="text-white">Login as:</label>
            <select
              name="userType"
              value={data.userType}
              onChange={handleChange}
              className="border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white">Email:</label>
            <input
              id="email"
              className="border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white">Password:</label>
            <input
              id="password"
              className="border-2 mt-2 p-3 text-gray-800 rounded-md focus:border-blue-800 transition duration-300 ease-in-out"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

