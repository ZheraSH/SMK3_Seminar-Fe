"use client";
import { School,GraduationCap } from "lucide-react";
import { useTeacherDashboard } from "../../../../Core/hooks/role-teacher/dashboard-teachers/useTeacherDashboard";
import ProfileIMG from "../../../../Core/hooks/profile/Profil";
import Headernew from "../../../components/elements/header/Header-new";

export default function BodyDashboardTeacher() {
  const { schedule, classrooms, userName } = useTeacherDashboard();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Headernew span={ <> <GraduationCap className="inline-block mr-2" size={41} /> Hello, {userName || "Guru"}</> } p={""} src="/images/particle/particle5.png" className="!h-[120px] !w-[156px] mt-3 mr-1"/> 
      <div className="mb-8 mt-4">
        <h2 className="text-[20px] font-semibold text-gray-900 mb-4"> Jadwal & Kelas </h2>
        <div className="flex flex-wrap gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {classrooms.length === 0 && (
            <p className="text-gray-600 text-sm italic">Data kelas kosong.</p>
          )}

          {classrooms.map((item) => (
            <div key={item.classroom?.id} className="bg-white rounded-2xl p-3 drop-shadow-lg border border-gray-200 w-full h-[117px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-[10px] flex items-center justify-center text-white font-semibold text-sm"> <School /> </div>
                <div>
                  <p className=" font-semibold text-[15px]"> {item.classroom?.homeroom_teacher?.name ?? "—"} </p>
                  <p className="font-medium text-[#3B82F6] text-[12px] truncate w-full"> Wali Kelas </p>
                </div>
              </div>
              <hr />
              <div className="flex justify-between mt-2">
                <p className="text-[12px] mb-1"> Jumlah Siswa:{" "} <span className="text-[#3B82F6]"> {item.students?.total_count ?? 0} </span> </p>
                <p className="text-[12px] text-gray-600"> {item.classroom?.name ?? "—"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#00000026] p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4"> Jadwal Mengajar Hari Ini </h2>
          <div className="overflow-x-auto  rounded-lg border border-gray-300">
            {schedule.length === 0 ? (
              <p className="text-gray-600 text-sm italic py-3">
                Tidak ada jadwal hari ini.
              </p>
            ) : (
              <table className="w-full text-[14px]  font-medium overflow-x-auto ">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Mapel</th>
                    <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Jam</th>
                    <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-center whitespace-nowrap">{item.subject?.name ?? "—"}</td>
                      <td className="px-4 py-3 text-center whitespace-nowrap"> {item.lesson_hour?.name ?? "—"} </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap"> {item.classroom?.name ?? "—"} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl  shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#00000026] p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4"> Status Absensi </h2>
          <div className="overflow-x-auto  rounded-lg border border-gray-300">
            {schedule.length === 0 ? (
              <p className="text-gray-600 text-sm italic py-3"> Belum ada data absensi hari ini. </p>
            ) : (
              <table className="w-full text-[14px] border-collapse text-center font-medium">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-3 rounded-tl-lg font-medium whitespace-nowrap">Kelas</th>
                    <th className="px-4 py-3 font-medium whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 rounded-tr-lg font-medium whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => {
                    const status =
                      item.attendance?.status?.toLowerCase() ?? "pending";

                    const statusClass =
                      status === "sudah absen"
                        ? "bg-[#10B98133] text-[#10B981]"
                        : status === "belum absen"
                        ? "bg-[#FF5E5333] text-[#FF4245]"
                        : "bg-gray-200 text-gray-700";

                    return (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition" >
                        <td className="px-4 py-2 whitespace-nowrap"> {item.classroom?.name ?? "—"} </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-md font-medium text-xs ${statusClass}`}>
                            {item.attendance?.status ?? "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <a href="/teacher-home/attendance-teacher" className="inline-block px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition"> Lihat Kelas </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
