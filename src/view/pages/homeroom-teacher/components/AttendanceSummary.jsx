"use client";
import React, { useEffect, useState } from "react";
import { SummaryCard } from "./SummaryCard";
import { fetchSummaryClassdaily } from "../../../../Core/api/role-homeroom/summary-class/SummaryClass";

export function AttendanceSummary() {
  const [attendance, setAttendance] = useState({
    present: 0,
    permission: 0,
    alpha: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await fetchSummaryClassdaily(today);

        if (data?.summary?.attendance) {
          setAttendance({
            present: data.summary.attendance.present,
            permission: data.summary.attendance.permission,
            alpha: data.summary.attendance.alpha,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-3.5" style={{ width: "250px" }}>
      <p className="text-[14px] text-center font-semibold">
        Ringkasan Total Kehadiran Siswa
      </p>

      <SummaryCard
        title="Total Siswa Hadir"
        value={`${attendance.present} Siswa`}
        color="#10B981"
      />

      <SummaryCard
        title="Total Siswa Izin"
        value={`${attendance.permission} Siswa`}
        color="#FACC15"
      />

      <SummaryCard
        title="Total Siswa Alpha"
        value={`${attendance.alpha} Siswa`}
        color="#FF5E53"
      />
    </div>
  );
}
