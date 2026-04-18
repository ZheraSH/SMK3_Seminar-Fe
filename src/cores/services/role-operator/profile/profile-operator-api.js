import api from "@services/axios-config";

export const getProfileOperator = async () => {
    try {
        const res = await api.get(`/school-information`);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal memuat profile operator:", err);
        throw err; 
    }
};

export const schoolYear = async () => {
    try {
        const res = await api.get(`/school-years/active`);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal memuat school year:", err);
        throw err; 
    }
}

export const updateProfileOperator = async (formData) => {
    try {
        const res = await api.post(`/school-information/update`, formData);
        return res.data;
    } catch (err) {
        console.error("Gagal update profile operator:", err);
        throw err;
    }
};

export const getPublicLogo = async () => {
    try {
        const res = await api.get(`/school-logo`);
        return res.data.data[0]; 
    } catch (err) {
        console.error("Gagal memuat logo public:", err);
        throw err;
    }
};



