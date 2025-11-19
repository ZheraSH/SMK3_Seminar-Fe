"use client";
import React from "react";
import { SummaryCard } from "./SummaryCard";



export function AttendanceSummary() {
  return (
    <div className="flex flex-col gap-3.5" style={{ width: "250px" }}>
      <p className="text-[14px] text-center font-semibold">
        Ringkasan Total Kehadiran Siswa
      </p>

      <SummaryCard
        title="Total Siswa Hadir"
        value="680 Siswa"
        color="#10B981"
      />

      <SummaryCard
        title="Total Siswa Izin"
        value="80 Siswa"
        color="#FACC15"
      />

      <SummaryCard
        title="Total Siswa Alpha"
        value="12 Siswa"
        color="#FF5E53"
      />
    </div>
  );
}
