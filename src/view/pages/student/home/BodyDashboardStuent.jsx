import ProfileHeader from "./components/ProfileHeader";
import Card from "./components/AttendanceCards";
import TableSchedule from "./components/TableSchedule";
import TableHistory from "./components/TableHistory";
import { DashboardStudent } from "../../../../Core/hooks/role-student/dashboard/DashboardStudent";
import LoadingData from "../../../components/Loading/Data";

export default function BodyDashboard() {

    const {
        attendance,
        profile,
        schedule,
        error,
        loading,
        classroom,
        permissions,

    } = DashboardStudent ();

    if (loading) {
        return <LoadingData loading={loading} />;
    }

    return (
        <div className="justify-center mx-4 md:mx-7 mb-10 mt-6">
            <ProfileHeader user={profile} header={classroom}/>
            <Card  attendance={attendance} />
            <div className="flex flex-col lg:flex-row gap-5 w-full">
                <div 
                    className="flex flex-col gap-5 w-full lg:w-[670px] lg:h-[383px] overflow-y-hidden rounded-xl shadow-lg border border-gray-300 p-5
                        [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:'none'] 
                        [scrollbar-width:'none']"
                >
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Jadwal Pelajaran Hari Ini</h1>
                    <TableSchedule 
                        schedule={schedule}
                        error={error}
                    />
                </div>
                <div 
                    className="w-full  lg:w-[474px] lg:h-[383px] gap-5 rounded-xl shadow-lg border border-gray-300 p-5 flex flex-col justify-start overflow-y-hidden
                        [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:'none'] 
                        [scrollbar-width:'none']"
                >
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Riwayat Izin Terbaru</h1>
                    <TableHistory 
                        history={permissions}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}