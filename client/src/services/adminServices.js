import { api } from "../utils/axiosIntances";

const adminLogin = async(data) => {
    try {
        const formData = data;
        const response = await api.post("/users/admin/login", formData,
            {
                headers: {

                }
            }
        )

        return response.data;
    } catch (error) {
        console.error("Error on admin login: ", error.message);
    }
}

export {
    adminLogin
}