import api from "../../axiosConfig";

export const getAttendanceClassroom = async (day) => {

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

export const getCrossCheckData = async (classroom_id, date, lesson_order, page = 1) => {
    const params = new URLSearchParams({
        classroom_id,
        date,
        lesson_order,
        page
    });
    
    try {
        const res = await api.get(`/teacher/attendances/form?${params.toString()}`, {
            headers: {
                Accept: "application/json",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};


export async function postCrossCheck(payload) {

    return api.post(
        `/teacher/attendances/submit`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
}
