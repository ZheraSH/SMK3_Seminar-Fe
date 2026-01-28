"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  ClipboardList,
  AlertTriangle,
  CalendarX as Calendar1,
  LayoutDashboard,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import AttendanceTableSection from "./ActivityTable";
import { fetchStatisticToday } from "../../../../../Core/api/role-operator/dashboard/DashboardApi";
import LoadingData from "../../../../components/elements/loadingData/loading";

// DEFAULT
const DEFAULT_PIE = [
  { name: "Hadir", value: 0, color: "#22C55E" },
  { name: "Telat", value: 0, color: "#FACC15" },
  { name: "Izin", value: 0, color: "#3B82F6" },
  { name: "Alpha", value: 0, color: "#EF4444" },
];

export default function ChartsSection({ lineData }) {
  const [attendanceData] = useState([]);
  const [pieData, setPieData] = useState(DEFAULT_PIE);
  const [presentPercent, setPresentPercent] = useState(0);
  const [smallCards, setSmallCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadToday = async () => {
      setLoading(true);
      try {
        const res = await fetchStatisticToday();
        if (!res) return;

        const total_students = res.total_students ?? 0;
        const present = res.present?.count ?? 0;
        const presentPercentage = res.present?.percentage ?? 0;
        const late = res.late?.count ?? 0;
        const permission = res.permission?.count ?? 0;
        const absent = res.absent?.count ?? 0;

        setPresentPercent(presentPercentage);
        // PIE
        setPieData([
          { name: "Hadir", value: present, color: "#22C55E" },
          { name: "Telat", value: late, color: "#FACC15" },
          { name: "Izin", value: permission, color: "#3B82F6" },
          { name: "Alpha", value: absent, color: "#EF4444" },
        ]);

        // SMALL CARDS
        setSmallCards([
          {
            value: present,
            label: "Total Siswa Hadir",
            barColor: "bg-green-500",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            Icon: CheckCircle,
          },
          {
            value: late,
            label: "Total Siswa Telat",
            barColor: "bg-yellow-500",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            Icon: Clock,
          },
          {
            value: permission,
            label: "Total Siswa Izin",
            barColor: "bg-blue-500",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            Icon: ClipboardList,
          },
          {
            value: absent,
            label: "Total Siswa Alpha",
            barColor: "bg-red-500",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            Icon: AlertTriangle,
          },
        ]);
      } catch (err) {
        console.error("❌ TODAY STAT ERROR:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    loadToday();
  }, []);

  if (loading) {
    return <LoadingData loading={true} type="dashboardCharts" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[14px]">
      {/* LEFT */}
      <div className="space-y-[14px]">
        {/* INFO */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-sm">Tahun Ajaran Saat Ini</p>
              <p className="text-2xl font-semibold mt-1">2024/2025</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
              <Calendar1 className="w-7 h-7 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-sm">Semester Saat Ini</p>
              <p className="text-2xl font-semibold mt-1">Genap</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-xl">
              <LayoutDashboard className="w-7 h-7 text-blue-500" />
            </div>
          </div>
        </div>

        <AttendanceTableSection attendanceData={attendanceData} />

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold">
            Statistik Absensi Kehadiran Siswa
          </h2>
          <p className="text-sm text-slate-600">Bulan ini</p>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="absence"
                stroke="#60a5fa"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* PIE */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">
            Statistik Kehadiran
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                cx="50%"
                cy="50%"
              >
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>

              {/* CENTER TEXT */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800 font-bold text-xl"
              >
                {presentPercent}%
              </text>
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-500 text-sm"
              >
                Hadir
              </text>
            </PieChart>
          </ResponsiveContainer>

          {/* LEGEND */}
          <div className="mt-10 space-y-1">
            {pieData.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="space-y-2">
          {smallCards.map((i, k) => (
            <div
              key={k}
              className="bg-white rounded-xl shadow-sm p-3 flex gap-4 border border-gray-300"
            >
              <div
                className={`w-1 h-14 rounded-full ${i.barColor}`}
              />
              <div className="flex-1">
                <p className="text-2xl font-semibold">
                  {i.value}
                </p>
                <p className="text-sm text-slate-600">
                  {i.label}
                </p>
              </div>
              <div className={`${i.iconBg} p-3 rounded-lg`}>
                <i.Icon
                  className={`w-6 h-6 ${i.iconColor}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
