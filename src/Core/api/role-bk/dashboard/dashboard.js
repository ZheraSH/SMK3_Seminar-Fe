import api from "../../axiosConfig";

export const getAlphaStudents = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await api.get(`/counselor/dashboard/high-alpha-students`,
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
    try { 
        const res = await api.get(
            `/counselor/dashboard/attendance-counts`,
            {
                headers: {
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

    try {
        const res = await api.get(
            `/counselor/attendance-permissions/pending`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil data pending attendance:", err);
    }
}