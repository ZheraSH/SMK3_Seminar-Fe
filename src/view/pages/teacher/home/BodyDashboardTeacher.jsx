"use client";
import { School } from "lucide-react";
import { useTeacherDashboard } from "../../../../Core/hooks/role-teacher/dashboard-teachers/useTeacherDashboard";


export default function BodyDashboardTeacher() {
  const { schedule, classrooms, userName } = useTeacherDashboard();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="bg-blue-500 rounded-lg p-4 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-300 rounded-full"></div>
        <h1 className="text-white text-lg sm:text-xl font-medium">
          Halo, {userName}
        </h1>
      </div>

      {/* CLASSROOMS */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Daftar Kelas Mengajar
        </h2>

        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {classrooms.length === 0 && (
            <p className="text-gray-600 text-sm italic">Data kelas kosong.</p>
          )}

          {classrooms.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 shadow-lg border border-gray-200 w-full sm:w-[216px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-[10px] flex items-center justify-center text-white font-semibold text-sm">
                  <School />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.classroom?.homeroom_teacher?.name ?? "—"}
                  </p>
                  <p className="text-blue-500 font-medium text-[12px] sm:text-sm">
                    Wali Kelas
                  </p>
                </div>
              </div>

              <hr />

              <div className="flex justify-between mt-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Jumlah Siswa:{" "}
                  <span className="text-blue-500">
                    {item.students?.total_count ?? 0}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
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
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Jadwal Mengajar Hari Ini
          </h2>

          <div className="overflow-x-auto">
            {schedule.length === 0 ? (
              <p className="text-gray-600 text-sm italic py-3">
                Tidak ada jadwal hari ini.
              </p>
            ) : (
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-3 py-2 text-center">Mapel</th>
                    <th className="px-3 py-2 text-center">Jam</th>
                    <th className="px-3 py-2 text-center">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-3 py-2 text-center">
                        {item.subject?.name ?? "—"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {item.lesson_hour?.name ?? "—"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {item.classroom?.name ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ABSEN */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Status Absensi
          </h2>

          <div className="overflow-x-auto max-h-80">
            {schedule.length === 0 ? (
              <p className="text-gray-600 text-sm italic py-3">
                Belum ada data absensi hari ini.
              </p>
            ) : (
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead className="bg-blue-500 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 text-center">Kelas</th>
                    <th className="px-3 py-2 text-center">Status</th>
                    <th className="px-3 py-2 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {schedule.map((item) => {
                    const status =
                      item.attendance?.status?.toLowerCase() ?? "pending";

                    const statusClass =
                      status === "sudah absen"
                        ? "bg-green-100 text-green-700"
                        : status === "belum absen"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700";

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-3 py-2 text-center">
                          {item.classroom?.name ?? "—"}
                        </td>

                        <td className="px-3 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded text-[12px] font-medium ${statusClass}`}
                          >
                            {item.attendance?.status ?? "Pending"}
                          </span>
                        </td>

                        <td className="px-3 py-2 text-center">
                          <a
                            href="/teacher-home/attendance-teacher"
                            className="inline-block px-3 py-1.5 bg-blue-500 text-white text-[12px] rounded hover:bg-blue-600"
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
    </div>
  );
}
