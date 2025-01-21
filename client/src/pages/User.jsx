import React, {useState, useEffect} from 'react';
import { logout } from "../services/userServices";
import { useNavigate, NavLink } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      //
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/user-login");
      }
    }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.success) navigate("/");
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error("Error during logout:" + error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-600 py-12 px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        
        <div>
          <h1 className="text-white text-xl text-center mb-4">Choose a Vehicle Option:</h1>
          <ul className="space-y-4">
            <li>
              <NavLink
                to='/register-vehicle'
                className={({ isActive }) =>
                  `block py-3 px-6 w-full text-white bg-gray-800 rounded-md border-2 border-transparent transition duration-300 ease-in-out
                  ${isActive ? "bg-orange-600" : "hover:bg-gray-700"}`
                }
              >
                Vehicle Info enter
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/reg-vech'
                className={({ isActive }) =>
                  `block py-3 px-6 w-full text-white bg-gray-800 rounded-md border-2 border-transparent transition duration-300 ease-in-out
                  ${isActive ? "bg-orange-600" : "hover:bg-gray-700"}`
                }
              >
                Register Vehicle
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/vech-Details'
                className={({ isActive }) =>
                  `block py-3 px-6 w-full text-white bg-gray-800 rounded-md border-2 border-transparent transition duration-300 ease-in-out
                  ${isActive ? "bg-orange-600" : "hover:bg-gray-700"}`
                }
              >
                Vehicle info
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/reg-detail'
                className={({ isActive }) =>
                  `block py-3 px-6 w-full text-white bg-gray-800 rounded-md border-2 border-transparent transition duration-300 ease-in-out
                  ${isActive ? "bg-orange-600" : "hover:bg-gray-700"}`
                }
              >
                reg Details
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-500 pt-6 mt-6">
          <h2 className="text-white text-lg text-center mb-4">Account Settings</h2>
          <button
            onClick={handleLogout}
            className="w-full py-3 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  )
}


export default User;
