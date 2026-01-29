import { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fetchAttendanceStatistics } from "../../../../../Core/api/role-homeroom/dashboard/HomeroomDashboard";
import LoadingData from "../../../../components/elements/loadingData/loading";

export default function AttendanceChart() {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [dateInfo, setDateInfo] = useState({ date: "", day_name: "" });
  const [data, setData] = useState([
    { name: "Hadir", value: 0 },
    { name: "Telat", value: 0 },
    { name: "Izin", value: 0 },
    { name: "Alfa", value: 0 },
  ]);

  const COLORS = ["#22c55e", "#f59e0b", "#0ea5e9", "#ef4444"];
  const EMPTY_COLOR = "#e5e7eb"; // abu-abu

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAttendanceStatistics();
        if (response.status) {
          const resData = response.data;
          const count = resData.count;

          setData([
            { name: "Hadir", value: count.present },
            { name: "Telat", value: count.late },
            { name: "Izin", value: count.permission },
            { name: "Alfa", value: count.alpha },
          ]);

          setPercentage(resData.attendance_percentage || 0);
          setDateInfo({
            date: resData.date,
            day_name: resData.day_name,
          });
        }
      } catch (error) {
        console.error("Failed to load chart data", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    loadData();
  }, []);

  const isEmptyData = useMemo(
    () => data.every((item) => item.value === 0),
    [data]
  );

  const chartData = isEmptyData
    ? [{ name: "Kosong", value: 1 }]
    : data;

  if (loading) {
    return <LoadingData loading={loading} type="card" />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Statistik Kehadiran Harian
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {dateInfo.day_name}, {dateInfo.date}
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={115}
            paddingAngle={isEmptyData ? 0 : 4}
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
                className="fill-gray-400 text-4xl font-bold"
              >
                {percentage}%
              </text>
            )}
          >
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={isEmptyData ? EMPTY_COLOR : COLORS[i]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor:
                  item.value === 0 ? EMPTY_COLOR : COLORS[i],
              }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
