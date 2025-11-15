import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getMajors = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/majors`);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal ambil majors:", err.message);
        throw err; 
    }
}