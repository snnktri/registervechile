import { api } from "../utils/axiosIntances"

const regVehilesToOFfice = async(data) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await api.post("/registrations/regVehicle", data, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the Authorization header
              },
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
 
}

const getDetails = async() => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await api.get("/registrations/getDetails", {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the Authorization header
              },
        })
        //console.log(response.data);
        return response.data.message;
    } catch (error) {
        console.error(error);
    }
}

const getAllDetails = async (req, res) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await api.get("/registrations/getAll", {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        console.log(response);
        return response.data.message;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export { regVehilesToOFfice, getDetails, getAllDetails }