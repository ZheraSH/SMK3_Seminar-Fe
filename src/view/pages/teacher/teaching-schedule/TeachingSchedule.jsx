"use client";
import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import HeaderPage2 from "../../../components/elements/header/Header.Page2";
import { useTeacherSchedule } from "../../../../Core/hooks/role-teacher/teacher-schedule/useTeacherSchedule";

// ===== FIX LOGIC ONLY (NO STYLE CHANGE) =====
function getMonday(dateString) {
  const d = new Date(dateString);
  const day = d.getDay(); // 0=minggu
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
}

function getDateFromWeek(selectedDate, targetDay) {
  const monday = getMonday(selectedDate);

  const dayIndexMap = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6,
  };

  const result = new Date(monday);
  result.setDate(monday.getDate() + dayIndexMap[targetDay]);
  return result.toISOString().split("T")[0];
}
// ===========================================

export default function TeacherSchedule() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [userName, setUserName] = useState("");

  const { schedule, activeDay, dayMap } =
    useTeacherSchedule(selectedDate);

  const days = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
    "Minggu",
  ];

  const reverseDayMap = {
    Senin: "monday",
    Selasa: "tuesday",
    Rabu: "wednesday",
    Kamis: "thursday",
    "Jum'at": "friday",
    Sabtu: "saturday",
    Minggu: "sunday",
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userData"));
    if (stored?.name) setUserName(stored.name);
  }, []);

  return (
    <div className="mx-4 sm:mx-7">
      <HeaderPage2
        h1="Jadwal Mengajar Guru XII PPLG 3"
        p="Data Jadwal Mengajar"
        user={userName}
        count_student="-"
        schoolyears={"2025/2026"}
      />

      <div className="w-full mt-6">
        {/* Tabs & Date */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-200 p-2 rounded-2xl gap-2 sm:gap-0">

          {/* TABS */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl shadow-sm overflow-x-auto w-full sm:w-auto">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => {
                  const backendDay = reverseDayMap[d];
                  setSelectedDate(
                    getDateFromWeek(selectedDate, backendDay)
                  );
                }}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  activeDay === d
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* DATE BADGE */}
          <div className="flex items-center gap-2 text-white px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 rounded-xl shadow-md mt-2 sm:mt-0">
            <CalendarDays size={18} />
            <span className="text-sm sm:text-base font-medium">
              {new Date(selectedDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-6 mb-20 overflow-x-auto">
          <div className="min-w-[600px] bg-blue-600 text-white rounded-[5px] py-4 px-4 grid grid-cols-5 font-medium text-center shadow text-sm sm:text-base">
            <div>No</div>
            <div>Hari</div>
            <div>Jam</div>
            <div>Kelas</div>
            <div>Mata Pelajaran</div>
          </div>

          <div className="flex flex-col min-w-[600px]">
            {schedule.map((item, i) => (
              <div
                key={item.id}
                className="bg-white rounded-[5px] shadow-sm px-4 py-4 grid grid-cols-5 text-center border border-gray-200 text-sm sm:text-base"
              >
                <div>{i + 1}</div>

                <div>{dayMap[item.day] || "-"}</div>

                <div>
                  {(item.lesson_hour?.start_time || "00:00").slice(0, 5)} -{" "}
                  {(item.lesson_hour?.end_time || "00:00").slice(0, 5)}
                </div>

                <div>
                  {`${item.classroom?.level || "-"} ${
                    item.classroom?.major || "-"
                  } ${
                    item.classroom?.name?.replace(/\D/g, "") || "-"
                  }`}
                </div>

                <div>{item.subject?.name || "-"}</div>
              </div>
            ))}

            {schedule.length === 0 && (
              <div className="text-center py-6 text-gray-500 min-w-[600px]">
                Tidak ada jadwal hari ini.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
