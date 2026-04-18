import api from "@services/axios-config";

export const fetchAttendanceHistory = (page = 1) => {
    return api.get("/student/attendance-history", {
        params: { 
            page: page 
        }
    });
};



