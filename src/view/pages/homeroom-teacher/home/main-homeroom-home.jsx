
import AttendanceChart from "./components/AttendanceChartHome"
import AttendanceTable from "./components/AttendanceRecordHome"
import StatisticsCard from "./components/StatisticsCardHome"

export default function HomeRoomHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <AttendanceChart />
          </div>

          <div className="lg:col-span-2 rounded-2xl shadow-lg border border-gray-200 bg-white p-8">
            <StatisticsCard />
          </div>
        </div>

        <div className="mt-8">
          <AttendanceTable />
        </div>
      </div>
    </div>
  )
}
