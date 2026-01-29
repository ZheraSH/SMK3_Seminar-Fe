import axios from "axios";

const token = localStorage.getItem("token");

export const fetchAttendanceHistory = (page = 1) => {
    return axios.get(`http://127.0.0.1:8000/api/student/attendance-history?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
