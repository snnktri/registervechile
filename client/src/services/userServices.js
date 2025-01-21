import { api } from "../utils/axiosIntances.js";

const registerUser = async (data) => {
  try {
    
    const formData = new FormData();//form create 

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]); 
      }
    }

    const response = await api.post("/users/registerUser", formData, {
      headers: {
        
      }
    });

    return response.data;
    //console.log(response.data)
  } catch (error) {
    console.error("Error during signup:", error);

    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    throw new Error("Signup failed. Please try again.");
  }
};

const logIn = async (data) => {
  try {
    const response = await api.post("/users/login", data, {
      headers: {

      }
    }
    )

    return response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Error during login"+error.message);
  }
}

const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage
    if (!token) {
      throw new Error("No access token found"); // Ensure a token is present
    }

    // Send request to logout
    const response = await api.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      }
    );

    // Log the response to understand its structure
    console.log("Logout Response:", response);

    // Check if the response contains 'success' and return data
    if (response && response.data && response.data.success) {
      return response.data; // Return success response
    } else {
      throw new Error("Logout failed: Unexpected response structure"); // Handle unexpected response
    }
  } catch (error) {
    // Log error for debugging
    console.error("Error during logout:", error);
    throw error; // Rethrow error for handling in component
  }
};

export { registerUser, logIn, logout };
