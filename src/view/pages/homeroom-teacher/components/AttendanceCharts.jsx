"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


//sementara saja
const pieData = [
  { name: "Hadir", value: 82, color: "#10B981" },
  { name: "Sakit", value: 8, color: "#FACC15" },
  { name: "Izin", value: 6, color: "#3B82F6" },
  { name: "Alpha", value: 4, color: "#FF5E53" },
];

const barData = [
  { name: "Senin", hadir: 75 },
  { name: "Selasa", hadir: 88 },
  { name: "Rabu", hadir: 85 },
  { name: "Kamis", hadir: 92 },
  { name: "Jumat", hadir: 80 },
];

export function AttendanceCharts() {
  return (
    <div className="flex gap-5">
      {/* LEFT CARD – PIE */}
      <div
        className="bg-white rounded-2xl shadow-lg p-5"
        style={{ width: "299px", height: "340px" }}
      >
        <h2 className="font-semibold text-[15px] mb-3">
          Rekap Kehadiran Hari Ini
        </h2>

        <div className="relative w-full h-[210px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* PERFECT CENTER */}
          <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-500">
            82%
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-between text-sm mt-2 px-3">
          {pieData.map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE CARD – BAR CHART */}
      <div
        className="bg-white rounded-2xl shadow-lg p-5"
        style={{ width: "500px", height: "340px" }}
      >
        <h2 className="font-semibold text-[15px]">
          Statistik Kehadiran Harian
        </h2>
        <p className="text-gray-500 text-xs mb-3">Data minggu ini</p>

        <div className="w-full h-[250px]">
          <ResponsiveContainer>
            <BarChart data={barData} barGap={20}>
              {/* X LABEL */}
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y LABEL */}
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />

              {/* CLEAN TOOLTIP */}
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />

              {/* BACKGROUND GREY (MIRIP SS) */}
              <Bar
                dataKey="hadir"
                fill="#3B82F6"
                radius={[10, 10, 0, 0]}
                barSize={60}
                background={{
                  fill: "#f0f0f0",
                  radius: 10,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
