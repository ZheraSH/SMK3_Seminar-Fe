import axios from "axios"
const API_BASE_URL = "http://127.0.0.1:8000/api";
import { notify } from "../../../../Core/hooks/notification/notify";

export const getAttendanceStatistics = async () => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(
            `${API_BASE_URL}/counselor/attendance/statistics`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                },
            }
        );

        console.log("Global Attendance Statistics:", res.data);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal mengambil statistik global:", err);

        return {
            total: 0,
            hadir: 0,
            sakit: 0,
            izin: 0,
            alpha: 0,
        };
    }
};