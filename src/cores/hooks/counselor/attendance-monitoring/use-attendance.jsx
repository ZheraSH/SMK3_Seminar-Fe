import { useEffect, useState, useCallback } from "react";
import { getAttendance } from "@services/role-counselor/dashboard/dashboard"


export function useAttendanceMonitoring() {
    const [attendance,setAttendance ] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const result = await getAttendance();
            setAttendance(result);
        } catch (error) {
            console.error('Fetch attendance gagal:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAttendance();
    }, []);
     

    return {
        attendance,
        loading,
        
    };
}
