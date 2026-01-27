import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        Accept: "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const fetchAttendanceStatistics = async () => {
    try {
        const res = await axiosClient.get("/homeroom-teacher/dashboard/attendance-counts");
        return res.data;
    } catch (err) {
        console.error("Gagal ambil statistics:", err);
        throw err;
    }
};
