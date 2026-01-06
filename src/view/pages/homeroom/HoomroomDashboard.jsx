"use client"

import { Calendar, Clock, Grid3x3 } from "lucide-react"

export function TeacherDashboard() {
  const attendanceData = [
    { no: 1, nama: "Valen Irwandy Mustabir", nisn: "006736837827", status: "Hadir", waktu: "08.30" },
    { no: 1, nama: "Valen Irwandy Mustabir", nisn: "006736837827", status: "Izin", waktu: "-" },
    { no: 1, nama: "Valen Irwandy Mustabir", nisn: "006736837827", status: "Hadir", waktu: "08.30" },
    { no: 1, nama: "Valen Irwandy Mustabir", nisn: "006736837827", status: "Sakit", waktu: "-" },
    { no: 1, nama: "Valen Irwandy Mustabir", nisn: "006736837827", status: "Alpha", waktu: "-" },
    { no: 1, nama: "Valen Irwandy Mustabir", nisn: "006736837827", status: "Hadir", waktu: "08.30" },
  ]

  const schedules = [
    { kelas: "XII PPLG 3", mapel: "Produktif", waktu: "07.00 - 08.45" },
    { kelas: "XII PPLG 3", mapel: "Produktif", waktu: "07.00 - 08.45" },
    { kelas: "XII PPLG 3", mapel: "Produktif", waktu: "07.00 - 08.45" },
    { kelas: "XII PPLG 3", mapel: "Produktif", waktu: "07.00 - 08.45" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-emerald-100 text-emerald-700"
      case "Izin":
        return "bg-blue-100 text-blue-700"
      case "Sakit":
        return "bg-yellow-100 text-yellow-700"
      case "Alpha":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 rounded-lg bg-blue-500 p-4 text-white md:gap-4 md:p-6">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/20 md:h-12 md:w-12" />
          <div>
            <h1 className="text-base font-semibold md:text-lg">Halo, Daddy Irwandi</h1>
            <p className="text-xs text-blue-100 md:text-sm">Wali Kelas</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {/* Statistics */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 md:text-lg">Statistik Kehadiran Harian</h2>
              <p className="text-xs text-gray-500 md:text-sm">Data minggu ini</p>
            </div>

            <div className="mt-4 flex items-center justify-center md:mt-6">
              <div className="relative h-48 w-48 md:h-64 md:w-64">
                {/* Donut Chart - using SVG */}
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Green segment (Hadir) - 82% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="15"
                    strokeDasharray="180 220"
                    strokeLinecap="round"
                  />
                  {/* Yellow segment (Sakit) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="15"
                    strokeDasharray="25 220"
                    strokeDashoffset="-180"
                    strokeLinecap="round"
                  />
                  {/* Blue segment (Alpha) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="15"
                    strokeDasharray="15 220"
                    strokeDashoffset="-205"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-500 md:text-4xl">82%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs md:mt-6 md:flex md:items-center md:justify-center md:gap-6 md:text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-gray-600">Hadir</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="text-gray-600">Sakit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-gray-600">Izin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-gray-600">Alpha</span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <Calendar className="h-4 w-4 text-blue-500 md:h-5 md:w-5" />
              <h2 className="text-base font-semibold text-gray-900 md:text-lg">Jadwal Mengajar Hari Ini</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
              {schedules.map((schedule, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-3 md:p-4">
                  <div className="mb-2 md:mb-3">
                    <span className="inline-block rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white md:px-3 md:py-1">
                      Kelas {schedule.kelas}
                    </span>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-700 md:text-sm">
                      <Grid3x3 className="h-3.5 w-3.5 text-gray-400 md:h-4 md:w-4" />
                      <span>{schedule.mapel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 md:text-sm">
                      <Clock className="h-3.5 w-3.5 text-gray-400 md:h-4 md:w-4" />
                      <span>{schedule.waktu}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="inline-block rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white">261 × 307</div>
          </div>
          <div className="mb-4 md:mb-6">
            <h2 className="text-base font-semibold text-gray-900 md:text-lg">Absensi Hari Ini</h2>
            <p className="text-xs text-gray-500 md:text-sm">Senin, 10 November 2025</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-3 py-2 text-left text-xs font-semibold md:px-4 md:py-3 md:text-sm">No</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold md:px-4 md:py-3 md:text-sm">Nama</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold md:px-4 md:py-3 md:text-sm">NISN</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold md:px-4 md:py-3 md:text-sm">Status</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold md:px-4 md:py-3 md:text-sm">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900 md:px-4 md:py-3 md:text-sm">{row.no}.</td>
                    <td className="px-3 py-2 text-xs text-gray-900 md:px-4 md:py-3 md:text-sm">{row.nama}</td>
                    <td className="px-3 py-2 text-xs text-gray-900 md:px-4 md:py-3 md:text-sm">{row.nisn}</td>
                    <td className="px-3 py-2 md:px-4 md:py-3">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium md:px-3 md:py-1 ${getStatusColor(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900 md:px-4 md:py-3 md:text-sm">{row.waktu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-center gap-1 md:mt-6 md:gap-2">
            <button className="rounded-lg bg-blue-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-600 md:px-3 md:py-2 md:text-sm">
              1
            </button>
            <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-sm">
              2
            </button>
            <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-sm">
              3
            </button>
            <span className="px-1 text-gray-500 md:px-2">...</span>
            <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-sm">
              15
            </button>
            <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
