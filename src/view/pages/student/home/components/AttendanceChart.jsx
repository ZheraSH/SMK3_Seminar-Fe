import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AttendanceChart({ statistik = [] }) {
  const legendItems = [
    { label: "Siswa Hadir", color: "#4ade80" },
    { label: "Siswa Telat", color: "#fbbf24" },
    { label: "Siswa Alpha", color: "#f87171" },
  ];

  //hover nya
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg px-4 py-3 min-w-[160px] ">
        <p className="text-sm font-semibold text-gray-800 mb-2">
          {label}
        </p>

        <div className="space-y-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomLegend = () => {
    return (
      <div className="flex justify-end items-center gap-4 mb-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[12px] text-gray-600 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[24px] font-bold text-gray-900">
            Statistik Absensi
          </h2>
          <p className="text-[16px] text-gray-500 mt-1">Data per bulan</p>
          <p className="text-[12px] text-gray-400 mt-2">
            Persentase kehadiran siswa
          </p>
        </div>
      </div>

      <div className="w-full h-[367px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={statistik}
            barGap={8}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#374151" }}
              interval={0} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#374151" }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 20, 40, 60, 80, 100]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              content={renderCustomLegend} 
              wrapperStyle={{ paddingBottom: "20px" }}
            />

            <Bar
              dataKey="hadir"
              fill="#4ade80" 
              barSize={12}
              name="Siswa Hadir"
            />
            <Bar
              dataKey="telat"
              fill="#fbbf24" 
              barSize={12}
              name="Siswa Telat"
            />
            <Bar
              dataKey="alpha"
              fill="#f87171" 
              barSize={12}
              name="Siswa Alpha"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}