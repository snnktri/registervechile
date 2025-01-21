import { api } from "../utils/axiosIntances"

const vehilceReg = async (data) => {

    const token = localStorage.getItem("accessToken");
    try {
        const formData = new FormData();//form create 

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]); 
          }
        }
        
        const response = await api.post("/vehicles/creatVeh", formData, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the Authorization header
              },
        })

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error or inserting vehilce details:" + error);
    }
}

const getDetails = async() => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await api.get("/vehicles/getDetails", {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the Authorization header
              },
        })

        //console.log(response.data.message);
        if (response.data) {
            //console.log(response.data.message);
            return response.data.message; // Return the vehicle details message
        } else {
            console.error("Unexpected response structure:", response.data);
            return null; // Or handle error accordingly
        }return response.data.data.message;
    }
    catch (error) {
        console.error("Error or fetching vehilce details:" + error);
    }
}

export { vehilceReg, getDetails
 };