"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

// Dummy data supaya pie tetap render
const EMPTY_PIE = [
  { name: "Hadir", value: 1 },
  { name: "Terlambat", value: 1 },
  { name: "Izin", value: 1 },
  { name: "Alpha", value: 1 },
]

// Warna aktif & kosong
const ACTIVE_COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"]
const EMPTY_COLORS = ["#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af"]

export default function AttendanceChart({
  isLoading = false,
  weeklyStats = [],
}) {

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow p-5 flex items-center justify-center h-[320px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  const total = weeklyStats.reduce(
    (acc, cur) => {
      acc.hadir += cur?.hadir ?? 0
      acc.telat += cur?.telat ?? 0
      acc.izin += cur?.izin ?? 0
      acc.alpha += cur?.alpha ?? 0
      return acc
    },
    { hadir: 0, telat: 0, izin: 0, alpha: 0 }
  )

  const totalAll =
    total.hadir + total.telat + total.izin + total.alpha

  const isEmpty = totalAll === 0

  const pieData = isEmpty
    ? EMPTY_PIE
    : [
        { name: "Hadir", value: total.hadir },
        { name: "Terlambat", value: total.telat },
        { name: "Izin", value: total.izin },
        { name: "Alpha", value: total.alpha },
      ]

  const colors = isEmpty ? EMPTY_COLORS : ACTIVE_COLORS

  const hadirPercent = isEmpty
    ? 0
    : Math.round((total.hadir / totalAll) * 100)

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
      <h2 className="font-semibold text-base">
        Statistik Kehadiran
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Hari ini
      </p>

      {/* PIE */}
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            stroke="none"
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>

          {/* CENTER LABEL */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-600 text-3xl font-bold"
          >
            {hadirPercent}%
          </text>
        </PieChart>
      </ResponsiveContainer>

      {/* LEGEND */}
      <div className="mt-4 space-y-2 text-sm">
        {[
          { label: "Hadir", value: total.hadir, color: "#22c55e" },
          { label: "Terlambat", value: total.telat, color: "#f59e0b" },
          { label: "Izin", value: total.izin, color: "#3b82f6" },
          { label: "Alpha", value: total.alpha, color: "#ef4444" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: isEmpty
                    ? "#9ca3af"
                    : item.color,
                }}
              />
              <span className="text-gray-600">
                {item.label}
              </span>
            </div>

            <span className="font-medium text-gray-700">
              {isEmpty ? "0%" : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
