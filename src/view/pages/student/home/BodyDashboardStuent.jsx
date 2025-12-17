import ProfileHeader from "./components/ProfileHeader";
import Card from "./components/AttendanceCards";
import TableSchedule from "./components/TableSchedule";
import TableHistory from "./components/TableHistory";
import { DashboardStudent } from "../../../../Core/hooks/role-student/dashboard/DashboardStudent";

export default function BodyDashboard() {

    const {
        profil,
        attendance,
        schedule,
        error,
        loading,
        permissions,

    } = DashboardStudent ();

    return (
        <div className="justify-center mx-3 mb-10">
            <Card  attendance={attendance} user={profil} />
            <div className="flex flex-col md:flex-row lg:flex-row gap-5 w-full">
                <div 
                    className="flex flex-col gap-5 w-full md:w-[550px] lg:w-[670px] lg:h-[383px] overflow-y-hidden rounded-xl shadow-lg border border-gray-300 p-5
                        [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:'none'] 
                        [scrollbar-width:'none']"
                >
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Jadwal Pelajaran Hari Ini</h1>
                    <TableSchedule 
                        schedule={schedule}
                        error={error}
                        loading={loading}
                    />
                </div>
                <div 
                    className="w-full md:w-[400px] lg:w-[474px] lg:h-[383px] gap-5 rounded-xl shadow-lg border border-gray-300 p-5 flex flex-col justify-start overflow-y-hidden
                        [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:'none'] 
                        [scrollbar-width:'none']"
                >
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Riwayat Izin Terbaru</h1>
                    <TableHistory 
                        history={permissions}
                        error={error}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}