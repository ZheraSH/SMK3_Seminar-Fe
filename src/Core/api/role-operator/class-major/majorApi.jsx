import api from "../../axiosConfig";

export const getMajors = async () => {
    try {
        const res = await api.get(`/majors`);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal ambil majors:", err.message);
        throw err; 
    }
}