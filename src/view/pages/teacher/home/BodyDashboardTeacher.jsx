"use client";
import { useState, useEffect } from "react";
import { School } from "lucide-react";
import { Link } from "react-router-dom";
import { useTeacherDashboard } from "../../../../Core/hooks/role-teacher/dashboard-teachers/useTeacherDashboard";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function BodyDashboardTeacher() {
  const { classrooms, schedule, isLoading } = useTeacherDashboard();
  const [user, setUser] = useState({ name: "", email: "", roles: [] });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const isMultiRole = user.roles && user.roles.length > 1;
  const attendancePath = isMultiRole ? "/dashboard/attendance-teacher" : "/teacher-home/attendance-teacher";

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading ? (
        <LoadingData loading={isLoading} type="kotakKecil" />
      ) : (
        <h2 className="text-[20px] font-semibold text-gray-900 mb-4">
          Selamat Datang, {user.name || "Guru"}
        </h2>
      )}
      <MainTeacher
        classrooms={classrooms}
        schedule={schedule}
        isLoading={isLoading}
        attendancePath={attendancePath}
      />
    </div>
  );
}

export const MainTeacher = ({ classrooms, schedule, isLoading, attendancePath }) => {
  return (
    <>
      <div className="mb-8 mt-2">
        {isLoading ? (
          <LoadingData loading={isLoading} type="cardClassroom" count={4} />
        ) : classrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {classrooms.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3 drop-shadow-lg border border-gray-200 w-full h-[117px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-[10px] flex items-center justify-center text-white font-semibold text-sm"> <School /> </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-[15px] truncate"> {item.homeroom_teacher?.name ?? "—"} </p>
                    <p className="font-medium text-[#3B82F6] text-[12px] truncate"> Wali Kelas </p>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between mt-2">
                  <p className="text-[12px] mb-1"> Jumlah Siswa: <span className="text-[#3B82F6]"> {item.students?.total ?? 0} </span> </p>
                  <p className="text-[12px] text-gray-600"> {item.name ?? "—"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm italic">Data kelas kosong.</p>
        )}
      </div>

      {isLoading ? (
        <LoadingData loading={isLoading} type="2card" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#00000026] p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4"> Jadwal Mengajar Hari Ini </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-300">
              {schedule.length === 0 ? (
                <p className="text-gray-600 text-sm italic py-3 px-4">
                  Tidak ada jadwal hari ini.
                </p>
              ) : (
                <table className="w-full text-[14px] font-medium">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Mapel</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Jam</th>
                      <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Kelas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 1 ? 'bg-[#EFF6FF]' : 'bg-white'} border-b border-gray-200 hover:bg-gray-50 transition`}>
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

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#00000026] p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4"> Status Absensi </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-300">
              {schedule.length === 0 ? (
                <p className="text-gray-600 text-sm italic py-3 px-4"> Belum ada data absensi hari ini. </p>
              ) : (
                <table className="w-full text-[14px] border-collapse text-center font-medium">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Kelas</th>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item, index) => {
                      const isSudahAbsen = item.has_cross_checked === true;
                      const statusText = isSudahAbsen ? "Sudah Absen" : "Belum Absen";
                      const statusClass = isSudahAbsen ? "bg-[#10B98133] text-[#10B981]" : "bg-[#FF5E5333] text-[#FF4245]";

                      return (
                        <tr key={index} className={`${index % 2 === 1 ? 'bg-[#EFF6FF]' : 'bg-white'} border-b border-gray-200 hover:bg-gray-50 transition`}>
                          <td className="px-4 py-2 whitespace-nowrap"> {item.classroom?.name ?? "—"} </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-md font-medium text-xs ${statusClass}`}>
                              {statusText}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <Link to={attendancePath} className="inline-block px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition">
                              Lihat Kelas
                            </Link>
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
      )}
    </>
  );
};