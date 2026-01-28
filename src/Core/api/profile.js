import axios from "axios";

export const getProfile = async () => {
    const token = localStorage.getItem("token");
    
    try {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/auth/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        return res.data?.data ?? [];
    }catch (error) {
        console.error("API Error:", error);
        return [];
    }
}



export const updatePhoto = async (photoData, token) => {
    try {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/change-photo", 
            photoData, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            }
        );
        return res.data; 
    } catch (error) {
        console.error("API Error: ", error.response?.data || error.message);
        throw error; 
    }
}


export const updateEmail = async (photoData, token) => {
    try {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/change-email", 
            photoData, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            }
        );
        return res.data; 
    } catch (error) {
        console.error("API Error: ", error.response?.data || error.message);
        throw error; 
    }
}


export const updatePassword = async (passwordData, token) => {
    try {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/auth/change-password", 
            passwordData, // Ini harus berupa object {current_password, new_password, ...}
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        return res.data; 
    } catch (error) {
        console.error("API Error: ", error.response?.data || error.message);
        throw error; 
    }
}


