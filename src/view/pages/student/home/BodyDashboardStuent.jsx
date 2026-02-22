import ProfileHeader from "./components/ProfileHeader";
import Card from "./components/AttendanceCards";
import TableSchedule from "./components/TableSchedule";
import TableHistory from "./components/TableHistory";
import { DashboardStudent } from "../../../../Core/hooks/role-student/dashboard/DashboardStudent";
import AttendanceChart from "./components/AttendanceChart";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function BodyDashboard() {

    const {
        schedule,
        error,
        loading,
        permissions,
        summary,
        statistik,
    } = DashboardStudent ();

    if (loading) {
        return <LoadingData loading={loading} />;
    }

    return (
        <div className="mb-10">
            {/* Card Summary Section */}
            <Card summary={summary} loading={loading} />

            <div className="flex flex-col md:flex-row lg:flex-row gap-5 w-full mt-5">
                {/* Jadwal Pelajaran Section */}
                <div className="flex flex-col gap-5 w-full md:w-full lg:w-full lg:h-[360px] rounded-xl shadow-lg border border-gray-300 p-4 bg-white">
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Jadwal Pelajaran Hari Ini</h1>
                    {loading ? (
                        <LoadingData loading={loading} type="tableSchedule" count={5} />
                    ) : (
                        <TableSchedule
                            schedule={schedule}
                            error={error}
                            loading={loading}
                        />
                    )}
                </div>

                {/* Riwayat Izin Section */}
                <div className="w-full lg:w-full lg:h-[360px] gap-5 rounded-xl shadow-lg border border-gray-300 p-4 flex flex-col justify-start bg-white">
                    <h1 className="text-[18px] md:text-[24px] font-semibold">Riwayat Izin Terbaru</h1>
                    {loading ? (
                        <LoadingData loading={loading} type="tableSiswaKaryawan" count={3} />
                    ) : (
                        <TableHistory
                            history={permissions}
                            error={error}
                            loading={loading}
                        />
                    )}
                </div>
            </div>

            {/* Attendance Chart Section */}
            <div className="mt-10">
                {loading ? (
                    <LoadingData loading={loading} type="statistikStudent" />
                ) : (
                    <AttendanceChart statistik={statistik} />
                )}
            </div>
        </div>
    );
}
