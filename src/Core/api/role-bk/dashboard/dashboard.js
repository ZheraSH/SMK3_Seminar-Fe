import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getAlphaStudents = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/counselor/dashboard/high-alpha-students`,
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


export const getAttendance = async () => {
    const token = localStorage.getItem("token");
    try { 
        const res = await axios.get(
            `${API_BASE_URL}/counselor/dashboard/attendance-counts`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            }
        );
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil data kehadiran:", err);  
    }
}


export const getAttendancePending = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/counselor/attendance-permissions/pending`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            }
        );
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil data pending attendance:", err);
    }
}