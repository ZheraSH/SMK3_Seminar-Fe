import api from "../../axiosConfig";

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