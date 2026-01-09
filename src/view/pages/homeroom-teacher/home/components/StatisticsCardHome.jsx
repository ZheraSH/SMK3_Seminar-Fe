import {
    CheckCircle2,
    AlertTriangle,
    Info,
    XCircle,
    CircleCheckBig,
    ClockAlert,
    ClipboardCheck,
    TriangleAlert,
  } from "lucide-react"
  
  import StatCard from "../utils/StatCard"
  
  export default function StatisticsCard() {
    const stats = [
      {
        id: 1,
        title: "Total Siswa Hadir",
        subtitle: "Total Siswa Hadir",
        value: "28",
        color: "green",
        icon: <CircleCheckBig size={20} />,
        progress: 80,
      },
      {
        id: 2,
        title: "Total Siswa Telat",
        subtitle: "Total Siswa Telat",
        value: "2",
        color: "yellow",
        icon: <ClockAlert size={20} />,
        progress: 20,
      },
      {
        id: 3,
        title: "Total Siswa Izin",
        subtitle: "Total Siswa Izin",
        value: "2",
        color: "blue",
        icon: <ClipboardCheck size={20} />,
        progress: 15,
      },
      {
        id: 4,
        title: "Total Siswa Alfa",
        subtitle: "Total Siswa Alfa",
        value: "2",
        color: "red",
        icon: <TriangleAlert size={20} />,
        progress: 10,
      },
    ]
  
    return (
      <div>
        <h2 className="text-[20px] font-semibold text-gray-900 mb-4">
          Total Rekap Kehadiran Siswa
        </h2>
        <p className="text-sm text-gray-500 mb-6">Data Hari Ini:</p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>
    )
  }
  