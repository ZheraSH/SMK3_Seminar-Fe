"use client";

export default function AttendanceTableSection({ attendanceData = [] }) {
  const isEmpty = attendanceData.length === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <h2 className="text-lg font-semibold p-6 pb-[14px]">
        Monitoring Kehadiran Hari Ini
      </h2>

      <div className="overflow-x-auto px-3 pb-5 h-[285px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              {["No", "Waktu Tap", "NISN", "Nama", "Kelas", "Status"].map(
                (h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-xs font-medium ${
                      i === 0 ? "rounded-tl-lg" : ""
                    } ${
                      i === 5 ? "rounded-tr-lg" : ""
                    } border-b border-blue-700`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="border border-gray-100">
            {isEmpty ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-sm text-slate-500 py-20"
                >
                  Belum ada data kehadiran hari ini
                </td>
              </tr>
            ) : (
              attendanceData.map((r, i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 0
                      ? "bg-white hover:bg-slate-50"
                      : "bg-slate-50 hover:bg-slate-100"
                  }
                >
                  <td className="px-4 py-3 text-sm border-b border-gray-200">
                    {i + 1}.
                  </td>

                  <td
                    className={`px-4 py-3 font-medium text-[14px] border-b border-gray-200 ${
                      r.status === "Terlambat"
                        ? "text-red-500"
                        : "text-blue-600"
                    }`}
                  >
                    {r.time}
                  </td>

                  <td className="px-4 py-3 text-[14px] border-b border-gray-200">
                    {r.nisn}
                  </td>

                  <td className="px-4 py-3 font-medium text-[14px] border-b border-gray-200">
                    {r.name}
                  </td>

                  <td className="px-4 py-3 font-medium text-[14px] border-b border-gray-200">
                    {r.class}
                  </td>

                  <td className="px-4 py-3 text-[14px] border-b border-gray-200">
                    <span
                      className={`px-3 py-1 rounded-[5px] text-xs font-semibold ${
                        r.status === "Masuk"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
