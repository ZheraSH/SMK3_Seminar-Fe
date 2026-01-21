import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/teacher";

export const getAttendanceClassroom = async (day) => {
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

        console.log("Data Absensi Kelas dari API:", res.data);
        return res.data.data;
    } catch (err) {
        console.error("Gagal memuat daftar kelas:", err.response?.data || err.message);
        return [];
    }
};

export const getCrossCheckData = async (classroom_id, date, lesson_order, page = 1) => {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams({
        classroom_id,
        date,
        lesson_order,
        page
    });
    
    try {
        const res = await axios.get(`${API_BASE_URL}/attendances/form?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};


export async function postCrossCheck(payload) {
    const token = localStorage.getItem("token");

    return axios.post(
        `${API_BASE_URL}/attendances/submit`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
}
