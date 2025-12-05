export default function ActivityTable({ activities }) {
    return (
      <div className="rounded-2xl bg-white border border-gray-200 shadow p-4 flex-1 overflow-x-auto">
        <div className="rounded-t-[7px] border border-gray-200 overflow-hidden w-full">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-[#3B82F6] text-white text-sm">
                <th className="py-3 px-4 w-[30%]">Nama</th>
                <th className="py-3 px-4 w-[25%]">Kelas</th>
                <th className="py-3 px-4 w-[25%]">Jam</th>
                <th className="py-3 px-4 text-center w-[20%]">Status</th>
              </tr>
            </thead>
  
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500 text-sm">
                    Data belum ada
                  </td>
                </tr>
              ) : (
                activities.map((a, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-[13px] truncate">{a.nama || a.name || "-"}</td>
  
                    <td className="py-3 px-4 text-[13px] truncate">{a.kelas || a.class || "-"}</td>
  
                    <td className="py-3 px-4 text-[13px] truncate">
                      {a.jam || a.time || new Date(a.timestamp || a.created_at).toLocaleTimeString("id-ID")}
                    </td>
  
                    <td className="py-3 px-4 text-center">
                      {a.status?.toLowerCase() === "masuk" || a.attendance_status === "present" ? (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">Masuk</span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">Telat</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  