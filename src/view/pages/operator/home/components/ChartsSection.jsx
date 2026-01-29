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
import {
  fetchStatisticToday,
  fetchStatisticMonthly,
} from "../../../../../Core/api/role-operator/dashboard/DashboardApi";
import LoadingData from "../../../../components/elements/loadingData/loading";

// DEFAULT
const DEFAULT_PIE = [
  { name: "Hadir", value: 0, color: "#22C55E" },
  { name: "Telat", value: 0, color: "#FACC15" },
  { name: "Izin", value: 0, color: "#3B82F6" },
  { name: "Alpha", value: 0, color: "#EF4444" },
];

export default function ChartsSection() {
  const [attendanceData] = useState([]);
  const [pieData, setPieData] = useState(DEFAULT_PIE);
  const [presentPercent, setPresentPercent] = useState(0);
  const [smallCards, setSmallCards] = useState([
    {
      value: 0,
      label: "Total Siswa Hadir",
      barColor: "bg-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      Icon: CheckCircle,
    },
    {
      value: 0,
      label: "Total Siswa Telat",
      barColor: "bg-yellow-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      Icon: Clock,
    },
    {
      value: 0,
      label: "Total Siswa Izin",
      barColor: "bg-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      Icon: ClipboardList,
    },
    {
      value: 0,
      label: "Total Siswa Alpha",
      barColor: "bg-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      Icon: AlertTriangle,
    },
  ]);
  const [lineData, setLineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [todayRes, monthlyRes] = await Promise.all([
          fetchStatisticToday(),
          fetchStatisticMonthly(),
        ]);

        if (todayRes) {
          const total_students = todayRes.total_students ?? 0;
          const present = todayRes.present?.count ?? 0;
          const presentPercentage = todayRes.present?.percentage ?? 0;
          const late = todayRes.late?.count ?? 0;
          const permission = todayRes.permission?.count ?? 0;
          const absent = todayRes.absent?.count ?? 0;

          const isEmpty =
            present === 0 && late === 0 && permission === 0 && absent === 0;

          setIsDataEmpty(isEmpty);
          setPresentPercent(presentPercentage);

          setPieData([
            {
              name: "Hadir",
              value: present,
              color: "#22C55E",
            },
            {
              name: "Telat",
              value: late,
              color: "#FACC15",
            },
            {
              name: "Izin",
              value: permission,
              color: "#3B82F6",
            },
            {
              name: "Alpha",
              value: absent,
              color: "#EF4444",
            },
          ]);

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
        }

        if (Array.isArray(monthlyRes) && monthlyRes.length > 0) {
          setLineData(monthlyRes);
        } else {
          setLineData([
            { month: "Jan", attendance_percentage: 0 },
            { month: "Feb", attendance_percentage: 0 },
            { month: "Mar", attendance_percentage: 0 },
            { month: "Apr", attendance_percentage: 0 },
            { month: "May", attendance_percentage: 0 },
            { month: "Jun", attendance_percentage: 0 },
            { month: "Jul", attendance_percentage: 0 },
            { month: "Aug", attendance_percentage: 0 },
            { month: "Sep", attendance_percentage: 0 },
            { month: "Oct", attendance_percentage: 0 },
            { month: "Nov", attendance_percentage: 0 },
            { month: "Dec", attendance_percentage: 0 },
          ]);
        }
      } catch (err) {
        console.error("❌ DASHBOARD DATA ERROR:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingData loading={true} type="dashboardCharts" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[14px]">
      {/* LEFT */}
      <div className="space-y-[14px]">
        <div className="space-y-[14px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Tahun Ajaran Saat Ini</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">
                  2024/2025
                </p>
              </div>
              <div className="bg-blue-100 p-3 md:p-4 rounded-xl">
                <Calendar1 className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Semester Saat Ini</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">Genap</p>
              </div>
              <div className="bg-blue-200 p-3 md:p-4 rounded-xl">
                <LayoutDashboard className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <AttendanceTableSection />

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold">
            Statistik Absensi Kehadiran Siswa
          </h2>
          <p className="text-sm text-slate-600">Bulan ini</p>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <defs>
                <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#2563EB" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "#D1D5DB" }}
                tickLine={false}
              />
              <YAxis axisLine={{ stroke: "#D1D5DB" }} tickLine={false} />
              <Tooltip
                cursor={{
                  stroke: "#2563EB",
                  strokeWidth: 2,
                  strokeDasharray: "3 3",
                }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance_percentage"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ r: 4, fill: "#2563EB", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{
                  r: 6,
                  fill: "#2563EB",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                connectNulls
                fill="url(#gradientLine)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Statistik Kehadiran</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={
                  isDataEmpty
                    ? [
                      { name: "Hadir", value: 1, color: "#E5E7EB" },
                      { name: "Telat", value: 1, color: "#E5E7EB" },
                      { name: "Izin", value: 1, color: "#E5E7EB" },
                      { name: "Alpha", value: 1, color: "#E5E7EB" },
                    ]
                    : pieData
                }
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                cx="50%"
                cy="50%"
              >
                {(isDataEmpty
                  ? [
                    { name: "Hadir", value: 1, color: "#E5E7EB" },
                    { name: "Telat", value: 1, color: "#E5E7EB" },
                    { name: "Izin", value: 1, color: "#E5E7EB" },
                    { name: "Alpha", value: 1, color: "#E5E7EB" },
                  ]
                  : pieData
                ).map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>

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

          <div className="mt-10 space-y-1">
            {DEFAULT_PIE.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold">{pieData[i].value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {smallCards.map((i, k) => (
            <div
              key={k}
              className="bg-white rounded-xl shadow-sm p-3 flex gap-4 border border-gray-300"
            >
              <div className={`w-1 h-14 rounded-full ${i.barColor}`} />
              <div className="flex-1">
                <p className="text-2xl font-semibold">{i.value}</p>
                <p className="text-sm text-slate-600">{i.label}</p>
              </div>
              <div className={`${i.iconBg} p-3 rounded-lg`}>
                <i.Icon className={`w-6 h-6 ${i.iconColor}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
