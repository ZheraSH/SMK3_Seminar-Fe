"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchSummaryClassWeekly } from "../../../../Core/api/role-homeroom/summary-class/SummaryClass";

export function AttendanceBarWeekly() {
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const today = new Date();
        const day = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const res = await fetchSummaryClassWeekly(
          monday.toISOString().split("T")[0],
          sunday.toISOString().split("T")[0]
        );

        setWeeklyData(res?.data ?? null);
      } catch (err) {
        console.error("Weekly attendance error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // === STATE HANDLING YANG WARAS ===
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-5 w-full lg:w-[600px] h-[340px] flex items-center justify-center text-sm text-gray-500">
        Mengambil data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-5 w-full lg:w-[600px] h-[340px] flex items-center justify-center text-sm text-red-500">
        Data gagal dimuat
      </div>
    );
  }

  if (!weeklyData || !weeklyData.daily_data?.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-5 w-full lg:w-[600px] h-[340px] flex items-center justify-center text-sm text-gray-500">
        Tidak ada data kehadiran
      </div>
    );
  }

  const barData = [
    { name: "Sen", hadir: weeklyData.daily_data?.[0]?.hadir ?? 0 },
    { name: "Sel", hadir: weeklyData.daily_data?.[1]?.hadir ?? 0 },
    { name: "Rab", hadir: weeklyData.daily_data?.[2]?.hadir ?? 0 },
    { name: "Kam", hadir: weeklyData.daily_data?.[3]?.hadir ?? 0 },
    { name: "Jum", hadir: weeklyData.daily_data?.[4]?.hadir ?? 0 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full lg:w-[600px] h-[340px]">
      <h2 className="font-semibold text-[15px] mb-3">
        Statistik Kehadiran Mingguan
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={barData} barGap={20}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
          <Tooltip />
          <Bar
            dataKey="hadir"
            fill="#3B82F6"
            radius={[10, 10, 0, 0]}
            barSize={55}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
