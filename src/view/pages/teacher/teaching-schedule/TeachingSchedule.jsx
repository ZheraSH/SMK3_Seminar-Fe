"use client";
import { useState } from "react";
import Header from "../../../components/elements/header/Header-new";
import { useTeacherSchedule } from "../../../../Core/hooks/role-teacher/teacher-schedule/useTeacherSchedule";
import { getBgColorBySubject } from "../../../../Core/utils/SubjectHelper";

export default function TeacherSchedule() {
  // 🔹 default hari ini
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const { schedule, activeDay } = useTeacherSchedule(selectedDate);

  // 🔹 Hari kerja saja
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  // 🔹 Ubah label hari → tanggal terdekat
  function getDateFromDay(dayLabel) {
    const todayDate = new Date();
    const todayIndex = todayDate.getDay(); // 0 - 6

    const map = {
      "Senin": 1,
      "Selasa": 2,
      "Rabu": 3,
      "Kamis": 4,
      "Jumat": 5,
    };

    const targetIndex = map[dayLabel];
    if (!targetIndex) return today;

    const diff = targetIndex - todayIndex;
    const result = new Date(todayDate);
    result.setDate(todayDate.getDate() + diff);

    return result.toISOString().split("T")[0];
  }

  return (
    <div className="mx-4 sm:mx-7 mt-5">
      <div className="container mx-auto">
        <Header
          span="Overview Jadwal Mengajar"
          p="Akses kelas untuk mencatat kehadiran siswa secara real-time."
          src="/images/background/bg-4.png"
        />
      </div>

      <div className="w-full mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-[#000000]/15 shadow-sm p-3 rounded-2xl gap-3">

          <h1 className="text-[20px] font-semibold ml-2">
            Daftar Jadwal Mengajar
          </h1>

          <div className="flex gap-2 p-2 rounded-2xl overflow-x-auto w-full sm:w-fit bg-white">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => {
                  const newDate = getDateFromDay(d);
                  setSelectedDate(newDate);
                }}
                className={`w-[72px] h-[36px] rounded-lg text-[12px]  font-semibold
                  transition-all duration-200
                  ${
                    activeDay === d
                      ? "bg-[#3B82F6] text-white shadow-md"
                      : "bg-[#E5E7EB] text-[#374151] border border-[#CBD5E1] shadow-md hover:bg-[#3B82F6] hover:text-white"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-20 overflow-x-auto rounded-md shadow">
          <table className="min-w-[600px] w-full text-sm text-left border-collapse">
            <thead className="bg-[#3B82F6] text-white">
              <tr>
                <th className="py-3 px-2 font-medium text-center">No</th>
                <th className="py-3 px-2 font-medium text-center">Penempatan</th>
                <th className="py-3 px-2 font-medium text-center">Jam</th>
                <th className="py-3 px-2 font-medium text-center">Mata Pelajaran</th>
                <th className="py-3 px-2 font-medium text-center">Kelas</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((item, i) => {
                const rowClass = i % 2 === 0 ? "bg-white" : "bg-[#EFF6FF]";

                return (
                  <tr
                    key={item.id}
                    className={`${rowClass} border-b border-gray-200`}
                  >
                    <td className="px-4 py-4 text-center">{i + 1}.</td>
                    
                    <td className="px-4 py-4 text-center">{item.lesson || "-"}</td>
                    
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-[#10B981]/20 text-[#10B981] w-[122px] h-[27px] rounded text-[15px] font-medium">
                        {item.time || "-"}
                      </span>
                    </td>
                    
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center justify-center text-white w-[120px]  rounded-2xl py-1.5 text-[12px] font-medium ${getBgColorBySubject (item.subject?.name)} `}>
                       {item.subject?.name || "-"}
                      </span>
                    </td>
                    
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-[#8B5CF6] text-white w-[80px]  rounded-2xl py-1.5 text-[12px] font-medium">
                       {item.classroom?.name || "-"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {schedule.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500 border border-gray-200 bg-white">
                    Tidak ada jadwal hari ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
