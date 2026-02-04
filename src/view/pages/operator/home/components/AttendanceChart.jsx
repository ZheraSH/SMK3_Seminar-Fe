import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

export default function AttendanceChart({ isLoading, weeklyStats }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow p-5 flex-1">
      <h2 className="font-semibold mb-4 text-[20px] sm:text-base">Grafik Kehadiran Siswa (7 Hari Terakhir)</h2>

      {isLoading ? (
        <div className="w-full h-[250px] sm:h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : weeklyStats.length > 0 ? (
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hari" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name) => {
                  const names = {
                    hadir: "Hadir",
                    izin: "Izin",
                    alpha: "Alpha",
                  }
                  return [value, names[name] || name]
                }}
                labelFormatter={(label) => `Tanggal: ${label}`}
              />
              <Legend
                formatter={(value) => {
                  const legends = {
                    hadir: "Hadir",
                    izin: "Izin",
                    alpha: "Alpha",
                  }
                  return legends[value] || value
                }}
              />
              <Bar dataKey="hadir" fill="#3B82F6" barSize={22} />
              <Bar dataKey="izin" fill="#F59E0B" barSize={22} />
              <Bar dataKey="alpha" fill="#EF4444" barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-[250px] sm:h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Data tidak tersedia</p>
        </div>
      )}
    </div>
  )
}
