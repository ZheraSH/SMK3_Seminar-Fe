import api from "../../axiosConfig";

export const fetchAttendanceHistory = (page = 1) => {
    return api.get("/student/attendance-history", {
        params: { 
            page: page 
        }
    });
};