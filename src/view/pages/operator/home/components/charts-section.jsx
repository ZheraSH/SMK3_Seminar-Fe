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

import AttendanceTableSection from "./activity-table";
import { fetchStatisticToday, fetchStatisticMonthly, fetchActiveSchoolYear, fetchActiveSemester } from "@services/role-operator/dashboard/dashboard-api";
import LoadingData from "@elements/loading-data/loading";

const MONTHS_NAME = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

const TooltipBubble = ({ x, y, value }) => {
  return (
    <foreignObject x={x - 30} y={y - 45} width="60" height="40">
      <div style={{
        background: "#75A9FF",
        borderRadius: "8px",
        padding: "4px 8px",
        boxShadow: "0 4px 12px rgba(117, 169, 255, 0.4)",
        fontSize: "12px",
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "40px",
      }}>
        {value}%
        <div style={{
          position: "absolute",
          bottom: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0",
          height: "0",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #75A9FF"
        }} />
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
  const [activeSchoolYear, setActiveSchoolYear] = useState(null);
  const [activeSemester, setActiveSemester] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [todayRes, monthlyRes, schoolYearRes, semesterRes] = await Promise.all([
          fetchStatisticToday(),
          fetchStatisticMonthly(),
          fetchActiveSchoolYear(),
          fetchActiveSemester()
        ]);

        if (schoolYearRes) setActiveSchoolYear(schoolYearRes);
        if (semesterRes) setActiveSemester(semesterRes);

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

          // Set default active month to current month
          const currentMonthIdx = new Date().getMonth();
          const currentMonthName = MONTHS_NAME[currentMonthIdx];
          setActiveData({ 
            month: currentMonthName, 
            value: trend[currentMonthName] ?? 0 
          });
        } else {
          setMonthlyTrendData(trend);
          
          const currentMonthIdx = new Date().getMonth();
          const currentMonthName = MONTHS_NAME[currentMonthIdx];
          setActiveData({ 
            month: currentMonthName, 
            value: 0 
          });
        }
      } catch (err) {
        console.error("❌ DASHBOARD LOAD ERROR:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    loadDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chartRef.current && !chartRef.current.contains(event.target)) {
        setActiveData(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dataPoints = useMemo(() => {
    return MONTHS_NAME.map(month => ({
      month: month,
      value: monthlyTrendData[month] ?? 0
    }));
  }, [monthlyTrendData]);

  const svgWidth = 700;
  const svgHeight = 260;
  const padding = 35;
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
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_245px] gap-[14px]">
      {/* LEFT */}
      <div className="space-y-[14px]">
        {/* INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center transition-all hover:border-blue-200">
            <div>
              <p className="text-sm text-slate-500 font-medium">Tahun Ajaran Saat Ini</p>
              <p className="text-2xl font-bold mt-1 text-slate-800">
                {activeSchoolYear ? activeSchoolYear.name : "..."}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <Calendar1 className="w-7 h-7 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center transition-all hover:border-indigo-200">
            <div>
              <p className="text-sm text-slate-500 font-medium">Semester Saat Ini</p>
              <p className="text-2xl font-bold mt-1 text-slate-800">
                {activeSemester ? activeSemester.semester : "..."}
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl">
              <LayoutDashboard className="w-7 h-7 text-indigo-500" />
            </div>
          </div>
        </div>

        

        {/* CUSTOM LINE CHART (bk style) */}
        <div ref={chartRef} className="bg-white rounded-2xl shadow-sm p-6 md:h-[353px] overflow-hidden border border-blue-100/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-md md:text-lg  font-bold">
              Statistik Absensi Kehadiran Siswa
            </h2>
            <p className="text-sm text-slate-600">Bulan ini</p>
          </div>

          {dataPoints.length === 0 ? (
            <div className="h-[180px] flex items-center justify-center">
              <p className="text-gray-500">Data tren bulanan tidak tersedia.</p>
            </div>
          ) : (
            <>
              <div className="relative -mt-4">
                <svg width="100%" height="180" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMinYMin meet" className="w-full h-auto">
                  <rect x={padding} y={padding} width={svgWidth - 2*padding} height={svgHeight - 2*padding} fill="#F0F7FF" rx="12" />

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
                      <text key={i} x={x} y={svgHeight - 8} textAnchor="middle" fontSize="12" fill="#64748b">
                        {pt.month.substring(0, 3)}
                      </text>
                    );
                  })}

                  <path d={areaPath} fill="url(#areaGradient)" />
                  <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="1.5" />

                  {points.map((pt, i) => (
                    <React.Fragment key={i}>
                      <circle cx={pt.x} cy={pt.y} r="10" fill="transparent" style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoveredData({ month: dataPoints[i].month, value: pt.value })}
                        onMouseLeave={() => setHoveredData(null)}
                        onClick={() => setActiveData({ month: dataPoints[i].month, value: pt.value })}
                      />
                      <circle cx={pt.x} cy={pt.y} r="4" fill="white" stroke="#3b82f6" strokeWidth="1" />
                      <circle cx={pt.x} cy={pt.y} r="2" fill="#3b82f6" />

                      {(hoveredData?.month === dataPoints[i].month || activeData?.month === dataPoints[i].month) && (
                        <>
                          <line 
                            x1={pt.x} 
                            y1={pt.y} 
                            x2={pt.x} 
                            y2={svgHeight - padding} 
                            stroke="#3b82f6" 
                            strokeDasharray="4 4" 
                            strokeWidth="1"
                            opacity="0.5"
                          />
                          <TooltipBubble x={pt.x} y={pt.y} value={pt.value.toFixed(1)} />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </svg>
              </div>
              
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-[2px] bg-[#3b82f6]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] -ml-[5px]" />
                    <div className="w-3 h-[2px] bg-[#3b82f6] -ml-[1px]" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {(hoveredData || activeData) ? `${(hoveredData || activeData).month}: ${(hoveredData || activeData).value.toFixed(1)}% Kehadiran` : "Hadir"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* PIE */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:w-[248px]">
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

      </div>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
          {smallCards.map((i, k) => (
            <div key={k} className="bg-white rounded-xl shadow-sm p-3 flex gap-4 border border-gray-300">
              <div className={`w-1 h-14 rounded-full ${i.barColor}`} />
              <div className="flex-1">
                <p className="text-2xl font-semibold">{i.value}</p>
                <p className="text-sm text-slate-600">{i.label}</p>
              </div>
              <div className={`${i.iconBg} p-3 rounded-lg flex justify-center items-center`}>
                <i.Icon className={`w-6 h-6 ${i.iconColor}`} />
              </div>
            </div>
          ))}
      </div>
    <div className="mt-6">
      <AttendanceTableSection attendanceData={attendanceData} />
    </div>
    </div>
  );
}

