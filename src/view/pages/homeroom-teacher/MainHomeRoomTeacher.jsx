"use client";

import { AttendanceCharts } from "./components/AttendanceCharts";
import { AttendanceSummary } from "./components/AttendanceSummary";
import HeaderHomeRoom from "./components/HeaderHomeRoom";
import { StudentDataTable } from "./components/StudentDataTable";


export default function ClassRecapHomeRoom() {
  return (
    <div className="w-full px-6 py-4">
        <HeaderHomeRoom/>
      <h1 className="text-[24px] font-semibold mb-3">Statistik Kehadiran</h1>

      <div className="flex gap-5">
        <AttendanceCharts />
        <AttendanceSummary />
      </div>

      <StudentDataTable />
    </div>
  );
}
