"use client";

import { useEffect, useState } from "react";
import { Users, UserCheck, Puzzle, School } from "lucide-react";
import { fetchDashboardCounters } from "@/Core/api/role-operator/dashboard/DashboardApi";

const CARD_CONFIG = [
  {
    key: "total_students",
    label: "Total Siswa",
    Icon: Users,
  },
  {
    key: "total_employees",
    label: "Total Karyawan",
    Icon: UserCheck,
  },
  {
    key: "total_majors",
    label: "Total Jurusan",
    Icon: Puzzle,
  },
  {
    key: "total_classrooms",
    label: "Total Kelas Aktif",
    Icon: School,
  },
];

export default function CounterCardsSection() {
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounters = async () => {
      try {
        const data = await fetchDashboardCounters();
        setCounters(data);
      } catch (err) {
        console.error("❌ LOAD COUNTERS FAILED:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCounters();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-[16px]">
      {CARD_CONFIG.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-4"
        >
          {/* LEFT BAR */}
          <div className="w-1 h-12 rounded-full bg-blue-500" />

          {/* TEXT */}
          <div className="flex-1">
            <p className="text-[22px] font-semibold text-slate-900 leading-none">
              {counters[item.key] ?? 0}
            </p>
            <p className="text-[13px] text-slate-500 mt-1">
              {item.label}
            </p>
          </div>

          {/* ICON */}
          <div className="bg-blue-100 p-3 rounded-lg">
            <item.Icon className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
