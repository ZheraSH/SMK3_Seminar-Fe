import api from "../../axiosConfig";

export const fetchAttendanceStatistics = async () => {
    try {
        const res = await api.get("/homeroom-teacher/dashboard/attendance-counts");
        return res.data;
    } catch (err) {
        console.error("Gagal ambil statistics:", err);
        throw err; 
    }
};

export const fetchRfidLogs = async () => {
    try {
        const res = await api.get("/homeroom-teacher/dashboard/rfid-logs");
        return res.data;
    } catch (err) {
        console.error("Gagal ambil RFID logs:", err);
        throw err;
    }
};