"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export default function AttendanceChart() {
  const data = [
    { name: "Hadir", value: 82 },
    { name: "Sakit", value: 10 },
    { name: "Izin", value: 5 },
    { name: "Alfa", value: 3 },
  ]

  const COLORS = ["#22c55e", "#f59e0b", "#0ea5e9", "#ef4444"]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Statistik Kehadiran Harian
      </h2>
      <p className="text-sm text-gray-500 mb-6">Data minggu ini:</p>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={115}
            paddingAngle={4}
            dataKey="value"
            cornerRadius={12}
            stroke="none"
            labelLine={false}
            label={() => (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-green-500 text-4xl font-bold"
              >
                82%
              </text>
            )}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
