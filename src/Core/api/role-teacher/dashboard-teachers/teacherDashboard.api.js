import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/teacher";

export const getDashboardClassroom = async (day) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/schedules/classrooms/${day}`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : `Bearer `,
                    Accept: "application/json",
                },
            }
        );

        return res.data.data;
    } catch (err) {
        console.error("Gagal memuat daftar kelas:", err.message);
        return [];
    }
};


export const getDashboardSchedule = async (day) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/schedules/${day}`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : `Bearer `,
                    Accept: "application/json",
                },
            }
        );

        return res.data.data;
    } catch (err) {
        console.error("Gagal memuat daftar kelas:", err.message);
        return [];
    }
};