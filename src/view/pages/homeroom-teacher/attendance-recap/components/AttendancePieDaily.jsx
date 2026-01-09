"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fetchSummaryClassWeekly } from "../../../../../Core/api/role-homeroom/summary-class/SummaryClass";

export function AttendancePieDaily() {
  const [dailyData, setDailyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const res = await fetchSummaryClassWeekly(today, today); // ambil 1 hari aja
        const todayData = res?.data?.daily_data?.[0] ?? null;
        setDailyData(todayData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!dailyData) return <div>Loading...</div>;

  const pieData = [
    { name: "Hadir", value: dailyData.hadir ?? 0, color: "#10B981" },
    { name: "Sakit", value: dailyData.sakit ?? 0, color: "#FACC15" },
    { name: "Izin", value: dailyData.izin ?? 0, color: "#3B82F6" },
    { name: "Alpha", value: dailyData.alpha ?? 0, color: "#FF5E53" },
  ];

  const totalHadir = pieData.find((d) => d.name === "Hadir")?.value ?? 0;
  const totalSemua = pieData.reduce((total, item) => total + item.value, 0);
  const persentaseHadir =
    totalSemua > 0 ? Math.round((totalHadir / totalSemua) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full sm:w-[320px] h-[340px] flex flex-col">
      <h2 className="font-semibold text-[15px] mb-3">Rekap Kehadiran Harian</h2>
      <div className="relative w-full h-[230px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData.some((d) => d.value > 0) ? pieData : [{ name: "No Data", value: 1, color: "#e5e7eb" }]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {(pieData.some((d) => d.value > 0) ? pieData : [{ name: "No Data", value: 1, color: "#e5e7eb" }])
                .map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-500">
          {persentaseHadir}%
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-between text-sm mt-2 px-3">
        {pieData.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
