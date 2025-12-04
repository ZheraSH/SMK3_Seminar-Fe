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
        permissions

    } = DashboardStudent ();

    return (
        <div className="justify-center mx-3 mb-10 mt-5">
            <ProfileHeader user={profil} />
            <Card  attendance={attendance} />
            <div className="flex flex-col md:flex-row lg:flex-row gap-5 w-full">
                <div className="flex flex-col gap-5 w-full md:w-[535px] lg:w-[675px] lg:h-[383px] overflow-auto rounded-xl shadow-lg border border-gray-300 p-5">
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Jadwal Pelajaran Hari Ini</h1>
                    <TableSchedule 
                    schedule={schedule}
                    error={error}
                    loading={loading}
                     />
                </div>
                <div className="w-full md:w-[404px] lg:w-[434px] h-[357px] gap-5 rounded-xl shadow-lg border border-gray-300 p-5 flex flex-col">
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
