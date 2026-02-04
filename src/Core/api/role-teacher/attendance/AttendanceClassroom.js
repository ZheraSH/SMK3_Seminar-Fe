import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/teacher";

export const getAttendanceClassroom = async (date) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/attendance/classroom?date=${date}`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : `Bearer `,
                    Accept: "application/json",
                },
            }
        );

        return res.data.data;
    } catch (err) {
        console.error("Gagal memuat daftar kelas:", err.response?.data || err.message);
        return [];
    }
};

export const getCrossCheckData = async (UuidClassroom, Date, LessonOrder, Page = 1) => {
    const token = localStorage.getItem("token");

    // VALIDASI: Jangan tembak API kalau parameter wajib tidak ada
    if (!UuidClassroom || !Date || !LessonOrder) {
        console.warn("Skip Fetch: Parameter belum lengkap", { UuidClassroom, Date, LessonOrder });
        return null; 
    }

    try {
        const res = await axios.get(
            `${API_BASE_URL}/attendance/cross-check-data`,
            {
                params: {
                    classroom_id: UuidClassroom,
                    date: Date,
                    lesson_order: LessonOrder,
                    page: Page
                },
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Gagal memuat data siswa:", error.response?.data || error.message);
        throw error;
    }
};


export async function postCrossCheck(payload) {
    const token = localStorage.getItem("token");

    return axios.post(
        `${API_BASE_URL}/attendance/cross-check`,
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
