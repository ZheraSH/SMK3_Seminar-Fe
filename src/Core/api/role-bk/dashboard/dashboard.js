import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getDashboard = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/counselor/dashboard`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            }
        );

        return res.data.data; 
    } catch (err) {
        console.error("Gagal mengambil Dashboard:", err);
    }
};
