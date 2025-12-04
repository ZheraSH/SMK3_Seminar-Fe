import { useEffect,useState } from "react";
import { getDashboardStudent } from "../../../api/role-student/dashboard/useDashboard";


export function DashboardStudent () {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [attendance, setAttendance] = useState({});
        const [profil, setProfil] = useState({});
        const [schedule,setSchedule] = useState ([]);
        const [permissions,setPermissions] = useState ([]);
    
        const fetchDashboard = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const data = await getDashboardStudent();
    
                if (!data?.data) {
                    setError("Gagal memuat data kelas.");
                    setLoading(false);
                    return;
                }
    
                setAttendance(data.data.attendance.summary);
                setProfil(data.data.header);
                setSchedule(data.data.today_schedules);
                setPermissions(data.data.latest_permissions);
    
            }
            catch (error) {
                console.error(error);
                setError("Terjadi kesalahan saat memuat data.");
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchDashboard();
        }, []);

    return {
        profil,attendance,schedule,error,loading,permissions
    }
}