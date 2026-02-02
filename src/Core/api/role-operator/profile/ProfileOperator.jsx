import api from "../../axiosConfig";


export const getProfileOperator = async () => {
    try {
        const res = await api.get(`/school-information`, {
            headers: {
                Accept: "application/json",
            },
        });
        return res.data.data; 
    } catch (err) {
        console.error("Gagal memuat profile operator:", err);
        throw err; 
    }
};


export const schoolYear = async () => {
    try {
        const res = await api.get(`/school-years/active`, {
            headers: {
                Accept: "application/json",
            },
        });
        return res.data.data; 
    } catch (err) {
        console.error("Gagal memuat profile operator:", err);
        throw err; 
    }
}


export const updateProfileOperator = async (formData) => {
    try {
        const res = await api.post(`/school-information/update`, formData, {
            headers: {
                Accept: "application/json",
            },
        });
        return res.data;
    } catch (err) {
        console.error("Gagal update profile operator:", err);
        throw err;
    }
};