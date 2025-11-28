import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getAbsenteeismMonitoring = async (params = {}) => { 
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(`${API_BASE_URL}/counselor/attendance-monitoring`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json"
            },
            params 
        });
        console.log("Data Monitoring Absen dari API:", res.data);
        return res.data.data;
    } catch (err) {
        console.error("Gagal fetch data:", err);
        return {
            recap: { present: 0, permission: 0, sick: 0, alpha: 0 },
            students: [],
        }; 
    }
};
