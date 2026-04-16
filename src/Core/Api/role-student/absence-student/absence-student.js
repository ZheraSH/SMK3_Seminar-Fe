import api from "@api/axios-config";

export const fetchAttendanceHistory = (page = 1) => {
    return api.get("/student/attendance-history", {
        params: { 
            page: page 
        }
    });
};



