import axios from "axios";


export const getProfileOperator = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/school-information`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : `Bearer`,
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
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/school-years/active`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : `Bearer`,
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
    const token = localStorage.getItem("token");
    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/school-information/update`, formData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : `Bearer`,
                Accept: "application/json",
            },
        });
        return res.data;
    } catch (err) {
        console.error("Gagal update profile operator:", err);
        throw err;
    }
};