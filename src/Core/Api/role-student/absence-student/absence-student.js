import api from "@api/axiosConfig";

export const fetchAttendanceHistory = (page = 1) => {
    return api.get("/student/attendance-history", {
        params: { 
            page: page 
        }
    });
};



