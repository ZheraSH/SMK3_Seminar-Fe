import api from "./axiosConfig";

export const getProfile = async () => {
    try {
        const res = await api.get("/auth/profile");
        return res.data?.data ?? [];
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export const updatePhoto = async (photoData) => {
    try {
        const res = await api.post("/auth/change-photo", photoData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("API Error: ", error.response?.data || error.message);
        throw error;
    }
}

export const updateEmail = async (emailData) => {
    try {
        const res = await api.post("/auth/change-email", emailData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("API Error: ", error.response?.data || error.message);
        throw error;
    }
}

export const updatePassword = async (passwordData) => {
    try {
        const res = await api.post("/auth/change-password", passwordData);
        return res.data;
    } catch (error) {
        console.error("API Error: ", error.response?.data || error.message);
        throw error;
    }
}


