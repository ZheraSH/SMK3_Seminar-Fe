import { useState, useEffect } from 'react';
import { getAlphaStudents, getAttendance,getAttendancePending } from '../../../api/role-bk/dashboard/dashboard';

export const useDashboardData = () => {
    const [data, setData] = useState([]); 
    const [attendance, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attendancePending,setAttendancePending] = useState([])

    const fetchAllData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const [alphaStudents, attendanceData, pendingAttendance] = await Promise.all([
                getAlphaStudents(),
                getAttendance(),
                getAttendancePending(),
            ]);

            setData(alphaStudents || []);
            setAttendance(attendanceData || []);
            setAttendancePending(pendingAttendance || []);

        } catch (err) {
            console.error("Gagal memuat data dashboard:", err);
            setError("Gagal memuat data dashboard. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []); 

    return { 
        data, 
        isLoading, 
        error, 
        refetch: fetchAllData,
        attendance,
        attendancePending
    };
};