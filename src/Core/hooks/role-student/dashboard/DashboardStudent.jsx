import { useEffect,useState } from "react";
import { fetchStudentSchedule,fetchAttendancePermissions,getDashboardSummary,fetchAttendanceMonthly} from "../../../api/role-student/dashboard/useDashboard";

export function DashboardStudent () {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [schedule,setSchedule] = useState ([]);
        const [permissions,setPermissions] = useState ([]);
        const [summary, setSummary] = useState ();
        const [statistik, setStatistik] = useState([]);


        const scheduleDashboard = async () => {
            setLoading(true);
            setError(null);

            try {
                const today = new Date()
                .toLocaleDateString("en-US", { weekday: "long" })
                .toLowerCase();

                const data = await fetchStudentSchedule(today);

                if (!data?.data) {
                setError("Gagal memuat data jadwal hari ini.");
                return;
                }

                setSchedule(data.data.schedules);
            } catch (error) {
                console.error(error);
                setError("Terjadi kesalahan saat memuat jadwal.");
            } finally {
                setLoading(false);
            }
            };

            const fetchPermissions = async () => {
                setLoading(true);
                setError(null);
                try {
                    const res = await fetchAttendancePermissions();

                    if (!res?.data || !Array.isArray(res.data)) {
                    setPermissions([]);
                    return;
                    }

                    // ambil 3 terbaru (atau 1 kalau mau)
                    setPermissions(res.data.slice(0, 3));
                } catch (error) {
                    console.error(error);
                    setPermissions([]);
                }
                };


        const fetchDashboardSummary = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const data = await getDashboardSummary();
    
                if (!data?.data) {
                    setError("Gagal memuat data kelas.");
                    setLoading(false);
                    return;
                }
                setSummary(data.data)
    
            }
            catch (error) {
                console.error(error);
                setError("Terjadi kesalahan saat memuat data.");
            } finally {
                setLoading(false);
            }
        };

        const fetchDashboarStatistik = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const data = await fetchAttendanceMonthly();
    
                if (!data?.data) {
                    setError("Gagal memuat data kelas.");
                    setLoading(false);
                    return;
                }
                setStatistik(data.data);
    
            }
            catch (error) {
                console.error(error);
                setError("Terjadi kesalahan saat memuat data.");
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            scheduleDashboard();
            fetchPermissions();
            fetchDashboardSummary ();
            fetchDashboarStatistik();
        }, []);

    return {
        scheduleDashboard,schedule,error,loading,permissions,summary,statistik
    }
}