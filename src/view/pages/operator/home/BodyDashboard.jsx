"use client";

import { useEffect, useState } from "react";
import CounterCardsSection from "./components/CounterCard";
import ChartsSection from "./components/ChartsSection";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function MainDashboard() {
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // popup login sukses
  useEffect(() => {
    const success = localStorage.getItem("loginSuccess");
    if (success) {
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);

        const statsData = await fetchStats();

        if (statsData?.weekly_stats) {
          const transformedData = statsData.weekly_stats.map((day) => ({
            month: new Date(day.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            }),
            absence: day.absent || 0,
          }));

          setWeeklyStats(transformedData);
        }
      } catch (err) {
        console.error("LOAD STATS FAILED:", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    loadStats();
  }, []);

  const lineData = weeklyStats.length
    ? weeklyStats
    : [
        { month: "Sen", absence: 5 },
        { month: "Sel", absence: 3 },
        { month: "Rab", absence: 2 },
        { month: "Kam", absence: 4 },
        { month: "Jum", absence: 1 },
      ];

  const pieData = [
    { name: "Hadir", value: 70, color: "#22C55E" },
    { name: "Telat", value: 10, color: "#FACC15" },
    { name: "Izin", value: 15, color: "#3B82F6" },
    { name: "Alpha", value: 5, color: "#EF4444" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-7xl sm:p-[24px] mb-10 relative">
        {/* COUNTERS (FETCH SENDIRI) */}
        {isLoading? 
        (<LoadingData  loading={isLoading} type="attendanceChart" count={4}/> ) 
        : (
          <CounterCardsSection />
        )}

        {/* CHARTS */}
        <ChartsSection lineData={lineData} pieData={pieData} />
      </div>
    </div>
  );
}
