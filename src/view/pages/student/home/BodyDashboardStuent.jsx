import ProfileHeader from "./components/ProfileHeader";
import Card from "./components/AttendanceCards";
import TableSchedule from "./components/TableSchedule";
import TableHistory from "./components/TableHistory";
import { DashboardStudent } from "../../../../Core/hooks/role-student/dashboard/DashboardStudent";
import AttendanceChart from "./components/AttendanceChart";

export default function BodyDashboard() {

    const {
        schedule,
        error,
        loading,
        permissions,
        summary,
        statistik,
    } = DashboardStudent ();

    return (
        <div className="justify-center mx-3 mb-10">
            <Card  summary={summary}/>
            <div className="flex flex-col md:flex-row lg:flex-row gap-5 w-full mt-5 px-4">
                <div 
                    className="flex flex-col gap-5 w-full md:w-full lg:w-full lg:h-[360px]  rounded-xl shadow-lg border border-gray-300 p-4"
                >
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Jadwal Pelajaran Hari Ini</h1>
                    <TableSchedule 
                        schedule={schedule}
                        error={error}
                        loading={loading}
                    />
                </div>
                <div 
                    className="w-full lg:w-full lg:h-[360px] gap-5 rounded-xl shadow-lg border border-gray-300 p-4 flex flex-col justify-start "
                >
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Riwayat Izin Terbaru</h1>
                    <TableHistory 
                        history={permissions}
                        error={error}
                        loading={loading}
                    />
                </div>
            </div>
            <div className=" mt-10">
                <AttendanceChart statistik={statistik} />
            </div>
        </div>
    );
}