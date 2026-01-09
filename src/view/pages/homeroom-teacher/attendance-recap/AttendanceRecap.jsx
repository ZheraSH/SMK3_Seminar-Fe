"use client";


import { AttendanceSummary } from "./components/AttendanceSummary";
import HeaderHomeRoom from "./components/HeaderHomeRoom";
import { StudentDataTable } from "./components/StudentDataTable";
import {AttendanceBarWeekly} from "./components/AttendanceCharts"
import { AttendancePieDaily } from "./components/AttendancePieDaily";


export default function ClassRecapHomeRoom() {
  
  return (
    <div className="w-full px-4 sm:px-6 py-4">
      <HeaderHomeRoom />

      <h1 className="text-[20px] sm:text-[24px] font-semibold mb-3">
        Statistik Kehadiran
      </h1>

      {/* Bagian chart + summary */}
      <div className="flex flex-col lg:flex-row gap-5">
        <AttendancePieDaily/>
        <AttendanceBarWeekly/>
        <AttendanceSummary />
      </div>

      <div className="mt-6">
        <StudentDataTable />
      </div>
    </div>
  );
}
