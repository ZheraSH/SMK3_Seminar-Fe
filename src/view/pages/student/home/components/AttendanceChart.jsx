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

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg px-3 py-2 md:px-4 md:py-3 min-w-[140px] md:min-w-[160px] border border-gray-100">
        <p className="text-xs md:text-sm font-semibold text-gray-800 mb-2">
          {label}
        </p>

        <div className="space-y-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] md:text-xs text-gray-600">
                  {item.name}
                </span>
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-gray-800">
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
      <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4 mb-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-1.5 md:mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] md:text-[12px] text-gray-600 font-medium whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    // UBAH: Padding responsif (p-4 di mobile, p-6 di desktop)
    <div className="w-full h-full rounded-2xl border border-gray-100 bg-white shadow-sm p-4 md:p-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-2 md:gap-0">
        <div>
          {/* UBAH: Ukuran font responsif */}
          <h2 className="text-lg md:text-[24px] font-bold text-gray-900 leading-tight">
            Statistik Absensi
          </h2>
          <p className="text-sm md:text-[16px] text-gray-500 mt-1">
            Data per bulan
          </p>
          <p className="text-xs md:text-[12px] text-gray-400 mt-1 md:mt-2 hidden md:block">
            Persentase kehadiran siswa
          </p>
        </div>
        {/* Bisa tambahkan filter dropdown disini jika perlu */}
      </div>

      {/* Chart Container */}
      {/* UBAH: Tinggi chart responsif (250px di mobile, 367px di desktop) */}
      <div className="w-full h-[250px] md:h-[367px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={statistik}
            barGap={4} // Gap antar bar lebih rapat sedikit
            margin={{ top: 10, right: 0, left: -25, bottom: 0 }} // Margin disesuaikan
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#374151" }}
              // UBAH: Hapus interval={0} agar label tidak bertumpuk di HP
              axisLine={false}
              tickLine={false}
              dy={10}
              minTickGap={10} // Mencegah overlap
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#374151" }}
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

            {/* UBAH: maxBarSize agar bar tidak terlalu lebar saat data sedikit */}
            <Bar
              dataKey="hadir"
              fill="#4ade80"
              radius={[4, 4, 0, 0]} 
              maxBarSize={12}
              name="Siswa Hadir"
            />
            <Bar
              dataKey="telat"
              fill="#fbbf24"
              radius={[4, 4, 0, 0]}
              maxBarSize={12}
              name="Siswa Telat"
            />
            <Bar
              dataKey="alpha"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={12}
              name="Siswa Alpha"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}