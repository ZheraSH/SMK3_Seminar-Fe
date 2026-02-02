import api from "../../axiosConfig";

const API_BASE_URL = "http://127.0.0.1:8000/api/teacher";

export const getDashboardClassroom = async (day) => {

    try {
        const res = await api.get(
            `/teacher/schedules/classrooms/${day}`,
            {
                headers: {
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

    try {
        const res = await api.get(
            `/teacher/schedules/${day}`,
            {
                headers: {
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