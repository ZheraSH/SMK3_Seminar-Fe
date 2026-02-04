"use client";

import { School } from "lucide-react";
import { useTeacherDashboard } from "../../../../Core/hooks/role-teacher/dashboard-teachers/useTeacherDashboard";
import ProfileIMG from "../../../../Core/hooks/profile/Profil";
import LoadingData from "../../../components/Loading/Data";

export default function BodyDashboardTeacher() {
  const { schedule, classrooms, userName, loading } = useTeacherDashboard();

  if (loading) { 
    return <LoadingData loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="bg-blue-500 rounded-lg p-4 mb-8 flex items-center gap-4">
        <ProfileIMG />
        <h1 className="text-white text-lg sm:text-xl font-medium">
          Halo, {userName}
        </h1>
      </div>

      {/* CLASSROOMS */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Daftar Kelas Mengajar
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {classrooms.length === 0 && (
            <p className="text-gray-600 text-sm italic">Data kelas kosong.</p>
          )}

          {classrooms.map((item) => (
            <div
              key={item.classroom?.id}
              className="bg-white rounded-2xl px-4 py-2 shadow-lg border border-gray-200 w-[216px] h-[104px] flex flex-col justify-between"
            >
              {/* CARD HEADER */}
              <div className="flex items-center gap-3 h-[56px]">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <School className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {item.classroom?.homeroom_teacher?.name ?? "—"}
                  </p>
                  <p className="text-blue-500 text-xs font-medium">
                    Wali Kelas
                  </p>
                </div>
              </div>

              <hr className="my-2" />

              {/* CARD FOOTER */}
              <div className="flex justify-between text-sm text-gray-600">
                <p>
                  Jumlah Siswa:{" "}
                  <span className="text-blue-500 font-medium">
                    {item.students?.total_count ?? 0}
                  </span>
                </p>
                <p className="truncate max-w-[80px] text-right">
                  {item.classroom?.name ?? "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JADWAL */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Jadwal Mengajar Hari Ini
          </h2>

          {schedule.length === 0 ? (
            <p className="text-gray-600 text-sm italic py-3">
              Tidak ada jadwal hari ini.
            </p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Mapel</th>
                  <th className="px-4 py-3 text-left">Jam</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Kelas</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{item.subject?.name ?? "—"}</td>
                    <td className="px-4 py-2">
                      {item.lesson_hour?.name ?? "—"}
                    </td>
                    <td className="px-4 py-2">{item.classroom?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ABSENSI */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status Absensi
          </h2>

          {schedule.length === 0 ? (
            <p className="text-gray-600 text-sm italic py-3">
              Belum ada data absensi hari ini.
            </p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Kelas</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((item) => {
                  const subject = item.subjects?.[0];
                  const status = subject?.attendance_status ?? "pending";

                  const STATUS_CLASS = {
                    completed: "bg-green-100 text-green-500",
                    pending: "bg-red-100 text-red-500",
                  };

                  return (
                    <tr
                      key={item.classroom?.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">
                        {item.classroom?.name ?? "—"}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-medium ${STATUS_CLASS[status]}`}
                        >
                          {subject?.attendance_status_label ?? "-"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href="/teacher-home/attendance-teacher"
                          className="inline-block px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
                        >
                          Lihat Kelas
                        </a>
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
  );
}
