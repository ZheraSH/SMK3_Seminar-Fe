import { useEffect,useState } from "react";
import { fetchStudentSchedule,fetchAttendancePermissions,getDashboardStudent} from "../../../api/role-student/dashboard/useDashboard";

export function DashboardStudent () {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [attendance, setAttendance] = useState({});
        const [classroom,setClassroom] = useState ();
        const [schedule,setSchedule] = useState ([]);
        const [permissions,setPermissions] = useState ([]);
        const [profile,setProfile] = useState();


        useEffect(() => {
            const stored = localStorage.getItem("userData");
           
            setProfile(JSON.parse(stored));
        }, []);

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

                setSchedule(data.data.jadwal);
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
                setClassroom(data.data.header);
    
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
            fetchDashboard();
        }, []);

    return {
        scheduleDashboard,schedule,profile,classroom,error,loading,permissions,attendance
    }
}