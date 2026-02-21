import api from "../../axiosConfig";

export const getAlphaStudents = async () => {
    try {
        const res = await api.get(`/counselor/dashboard/high-alpha-students`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil Dashboard:", err);
    }
};


export const getAttendance = async () => {
    try {
        const res = await api.get(`/counselor/dashboard/attendance-counts`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil data kehadiran:", err);
    }
}


export const getAttendancePending = async () => {

    try {
        const res = await api.get(`/counselor/attendance-permissions/pending`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil data pending attendance:", err);
    }
}