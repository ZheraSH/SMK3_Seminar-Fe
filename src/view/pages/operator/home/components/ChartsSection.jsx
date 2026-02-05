"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import React from "react";
import { CheckCircle, Clock, ClipboardList, AlertTriangle, CalendarX as Calendar1, LayoutDashboard } from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import AttendanceTableSection from "./ActivityTable";
import { fetchStatisticToday, fetchStatisticMonthly } from "../../../../../Core/api/role-operator/dashboard/DashboardApi";
import LoadingData from "../../../../components/elements/loadingData/loading";

const MONTHS_NAME = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

const TooltipBubble = ({ x, y, value }) => {
  return (
    <foreignObject x={x - 40} y={y - 50} width="80" height="40">
      <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", borderRadius: "8px", padding: "4px 8px", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", border: "1px solid rgba(200,200,200,0.6)", fontSize: "12px", textAlign: "center", color: "#1d4ed8", fontWeight: "bold", }}>
        {value}%
      </div>
    </foreignObject>
  );
};

const getCurvePath = (points, svgHeight, padding, isArea = false) => {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  const tension = 0.2;

  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const prev = points[i > 1 ? i - 2 : i - 1];
    const next = points[i < points.length - 1 ? i + 1 : i];

    const c1x = p0.x + (p1.x - prev.x) * tension;
    const c1y = p0.y + (p1.y - prev.y) * tension;

    const c2x = p1.x - (next.x - p0.x) * tension;
    const c2y = p1.y - (next.y - p0.y) * tension;

    path += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p1.x} ${p1.y}`;
  }

  if (isArea) {
    const baselineY = svgHeight - padding;
    path += ` L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;
  }

  return path;
};

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
  const [smallCards, setSmallCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [monthlyTrendData, setMonthlyTrendData] = useState({});
  const [hoveredData, setHoveredData] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [todayRes, monthlyRes] = await Promise.all([
          fetchStatisticToday(),
          fetchStatisticMonthly()
        ]);

        if (todayRes) {
          const present = todayRes.present?.count ?? 0;
          const presentPercentage = todayRes.present?.percentage ?? 0;
          const late = todayRes.late?.count ?? 0;
          const permission = todayRes.permission?.count ?? 0;
          const absent = todayRes.absent?.count ?? 0;

          const isEmpty = present === 0 && late === 0 && permission === 0 && absent === 0;
          setIsDataEmpty(isEmpty);

          setPresentPercent(presentPercentage);
          setPieData([
            { name: "Hadir", value: present, color: isEmpty ? "#9CA3AF" : "#22C55E" },
            { name: "Telat", value: late, color: isEmpty ? "#9CA3AF" : "#FACC15" },
            { name: "Izin", value: permission, color: isEmpty ? "#9CA3AF" : "#3B82F6" },
            { name: "Alpha", value: absent, color: isEmpty ? "#9CA3AF" : "#EF4444" },
          ]);

          setSmallCards([
            { value: present, label: "Total Siswa Hadir", barColor: "bg-green-500", iconBg: "bg-green-100", iconColor: "text-green-600", Icon: CheckCircle },
            { value: late, label: "Total Siswa Telat", barColor: "bg-yellow-500", iconBg: "bg-yellow-100", iconColor: "text-yellow-600", Icon: Clock },
            { value: permission, label: "Total Siswa Izin", barColor: "bg-blue-500", iconBg: "bg-blue-100", iconColor: "text-blue-600", Icon: ClipboardList },
            { value: absent, label: "Total Siswa Alpha", barColor: "bg-red-500", iconBg: "bg-red-100", iconColor: "text-red-600", Icon: AlertTriangle },
          ]);
        }

        const trend = {};
        MONTHS_NAME.forEach(m => trend[m] = 0);

        const englishMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        if (monthlyRes && Array.isArray(monthlyRes)) {
          monthlyRes.forEach(item => {
            if (typeof item.month === 'number' && item.month >= 1 && item.month <= 12) {
              trend[MONTHS_NAME[item.month - 1]] = item.attendance_percentage;
            } else if (typeof item.month === 'string') {
              const engIndex = englishMonths.indexOf(item.month);
              if (engIndex !== -1) {
                trend[MONTHS_NAME[engIndex]] = item.attendance_percentage;
              } else if (MONTHS_NAME.includes(item.month)) {
                trend[item.month] = item.attendance_percentage;
              }
            }
          });
          setMonthlyTrendData(trend);
        } else {
          setMonthlyTrendData(trend);
        }
      } catch (err) {
        console.error("❌ DASHBOARD LOAD ERROR:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    loadDashboardData();
  }, []);

  const dataPoints = useMemo(() => {
    return MONTHS_NAME.map(month => ({
      month: month,
      value: monthlyTrendData[month] ?? 0
    }));
  }, [monthlyTrendData]);

  const svgWidth = 620;
  const svgHeight = 300;
  const padding = 40;
  const yAxisLabels = [0, 20, 40, 60, 80, 100];
  const xStep = dataPoints.length > 1 ? (svgWidth - padding * 2) / (dataPoints.length - 1) : 0;
  const yMax = 100;

  const points = dataPoints.map((point, index) => ({
    x: padding + index * xStep,
    y: svgHeight - padding - (point.value / yMax) * (svgHeight - padding * 2),
    value: point.value,
  }));

  const pathData = getCurvePath(points, svgHeight, padding, false);
  const areaPath = getCurvePath(points, svgHeight, padding, true);

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

        {/* CUSTOM LINE CHART (BK STYLE) */}
        <div ref={chartRef} className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
          <h2 className="text-lg font-bold">
            Statistik Absensi Kehadiran Siswa
          </h2>
          <p className="text-sm text-slate-600 mb-4">Bulan ini</p>

          {dataPoints.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center">
              <p className="text-gray-500">Data tren bulanan tidak tersedia.</p>
            </div>
          ) : (
            <div className="relative">
              <svg width="100%" height="260" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMinYMin meet" className="w-full h-auto">
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {yAxisLabels.map((value) => {
                  const y = svgHeight - padding - (value / 100) * (svgHeight - padding * 2);
                  return (
                    <React.Fragment key={value}>
                      <line x1={padding} y1={y} x2={svgWidth - padding} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
                      <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="12" fill="#64748b">
                        {value}
                      </text>
                    </React.Fragment>
                  );
                })}

                {dataPoints.map((pt, i) => {
                  const x = padding + i * xStep;
                  return (
                    <text key={i} x={x} y={svgHeight - 10} textAnchor="middle" fontSize="12" fill="#64748b">
                      {pt.month.substring(0, 3)}
                    </text>
                  );
                })}

                <path d={areaPath} fill="url(#areaGradient)" />
                <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2.5" />

                {points.map((pt, i) => (
                  <React.Fragment key={i}>
                    <circle cx={pt.x} cy={pt.y} r="10" fill="transparent" style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredData({ month: dataPoints[i].month, value: pt.value })}
                      onMouseLeave={() => setHoveredData(null)}
                      onClick={() => setActiveData({ month: dataPoints[i].month, value: pt.value })}
                    />
                    <circle cx={pt.x} cy={pt.y} r="6" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx={pt.x} cy={pt.y} r="3" fill="#3b82f6" />

                    {(hoveredData?.month === dataPoints[i].month || activeData?.month === dataPoints[i].month) && (
                      <TooltipBubble x={pt.x} y={pt.y} value={pt.value.toFixed(1)} />
                    )}
                  </React.Fragment>
                ))}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* PIE */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">
            Statistik Kehadiran
          </h2>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={isDataEmpty ? [{ name: "No Data", value: 1 }] : pieData}
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                >
                  {isDataEmpty ? (
                    <Cell fill="#E5E7EB" stroke="none" />
                  ) : (
                    pieData.map((e, i) => (
                      <Cell key={i} fill={e.color} stroke="none" />
                    ))
                  )}
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
          </div>

          {/* LEGEND */}
          <div className="mt-10 space-y-1">
            {DEFAULT_PIE.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold">{pieData[i].value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="space-y-2">
          {smallCards.map((i, k) => (
            <div key={k} className="bg-white rounded-xl shadow-sm p-3 flex gap-4 border border-gray-300">
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
