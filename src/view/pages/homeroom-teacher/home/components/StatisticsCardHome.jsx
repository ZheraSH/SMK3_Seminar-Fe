import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  CircleCheckBig,
  ClockAlert,
  ClipboardCheck,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "../utils/StatCard";
import { fetchAttendanceStatistics } from "../../../../../Core/api/role-homeroom/dashboard/HomeroomDashboard";
import LoadingData from "../../../../components/elements/loadingData/loading";

export default function StatisticsCard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Total Siswa Hadir",
      subtitle: "Total Siswa Hadir",
      value: "0",
      color: "green",
      icon: <CircleCheckBig size={20} />,
      progress: 0,
    },
    {
      id: 2,
      title: "Total Siswa Telat",
      subtitle: "Total Siswa Telat",
      value: "0",
      color: "yellow",
      icon: <ClockAlert size={20} />,
      progress: 0,
    },
    {
      id: 3,
      title: "Total Siswa Izin",
      subtitle: "Total Siswa Izin",
      value: "0",
      color: "blue",
      icon: <ClipboardCheck size={20} />,
      progress: 0,
    },
    {
      id: 4,
      title: "Total Siswa Alfa",
      subtitle: "Total Siswa Alfa",
      value: "0",
      color: "red",
      icon: <TriangleAlert size={20} />,
      progress: 0,
    },
  ]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchAttendanceStatistics();
        if (response.status) {
          const data = response.data;
          setDashboardData(data);

          const totalStudents = data.total_students || 1; // Avoid division by zero

          setStats([
            {
              id: 1,
              title: "Total Siswa Hadir",
              subtitle: "Total Siswa Hadir",
              value: data.count.present.toString(),
              color: "green",
              icon: <CircleCheckBig size={20} />,
              progress: Math.round((data.count.present / totalStudents) * 100),
            },
            {
              id: 2,
              title: "Total Siswa Telat",
              subtitle: "Total Siswa Telat",
              value: data.count.late.toString(),
              color: "yellow",
              icon: <ClockAlert size={20} />,
              progress: Math.round((data.count.late / totalStudents) * 100),
            },
            {
              id: 3,
              title: "Total Siswa Izin",
              subtitle: "Total Siswa Izin",
              value: data.count.permission.toString(),
              color: "blue",
              icon: <ClipboardCheck size={20} />,
              progress: Math.round((data.count.permission / totalStudents) * 100),
            },
            {
              id: 4,
              title: "Total Siswa Alfa",
              subtitle: "Total Siswa Alfa",
              value: data.count.alpha.toString(),
              color: "red",
              icon: <TriangleAlert size={20} />,
              progress: Math.round((data.count.alpha / totalStudents) * 100),
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load statistics", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <LoadingData loading={loading} type="DashboardWaliKelas2" />;
  }

  return (
    <div>
      <div className="flex flex-col mb-4">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Total Rekap Kehadiran Siswa
        </h2>
        {dashboardData && (
          <p className="text-sm text-gray-500 mt-1">
            {dashboardData.day_name}, {dashboardData.date} • {dashboardData.classroom}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
}
