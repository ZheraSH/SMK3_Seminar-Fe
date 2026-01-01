"use client"

import { useEffect, useState } from "react"
import {
  UsersRound,
  ContactRound,
  UserRoundCog,
  DoorClosed,
  CircleCheckBig,
} from "lucide-react"

import {
  fetchCounters,
  fetchActivities,
  fetchStats,
} from "../../../../Core/api/role-operator/dashboard/DashboardApi"

import CounterCard from "./components/CounterCard"
import AttendanceChart from "./components/AttendanceChart"
import ActivityTable from "./components/ActivityTable"

/* =========================
   CONFIG
========================= */
const counterConfig = [
  {
    key: "total_students",
    color: "#0475B0",
    bg: "bg-[#3B82F6]/20",
    icon: <UsersRound size={40} className="text-[#0475B0]" />,
    title: "Total Siswa",
  },
  {
    key: "total_teachers",
    color: "#10B981",
    bg: "bg-[#10B981]/20",
    icon: <ContactRound size={40} className="text-[#10B981]" />,
    title: "Total Guru",
  },
  {
    key: "total_staff",
    color: "#FF5E53",
    bg: "bg-[#FF5E53]/20",
    icon: <UserRoundCog size={40} className="text-[#FF5E53]" />,
    title: "Total Staff",
  },
  {
    key: "total_classrooms",
    color: "#8B5CF6",
    bg: "bg-[#8B5CF6]/20",
    icon: <DoorClosed size={40} className="text-[#8B5CF6]" />,
    title: "Total Kelas",
  },
  {
    key: "attendance_percentage_today",
    color: "#FACC15",
    bg: "bg-[#FACC15]/20",
    icon: <CircleCheckBig size={40} className="text-[#FACC15]" />,
    title: "Kelas Selesai",
  },
]

/* =========================
   SKELETONS
========================= */
function CounterSkeleton() {
  return <div className="h-28 rounded-xl bg-gray-200 animate-pulse" />
}

function ChartSkeleton() {
  return <div className="flex-1 h-[320px] rounded-xl bg-gray-200 animate-pulse" />
}

function ActivityTableSkeleton() {
  return (
    <div className="flex-1 space-y-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 rounded-md" />
      ))}
    </div>
  )
}

/* =========================
   MAIN
========================= */
export default function MainDashboard() {
  const [counters, setCounters] = useState({})
  const [activities, setActivities] = useState([])
  const [weeklyStats, setWeeklyStats] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      try {
        const [countersData, activitiesData, statsData] = await Promise.all([
          fetchCounters(),
          fetchActivities(),
          fetchStats(),
        ])

        setCounters(countersData || {})
        setActivities(activitiesData || [])

        if (statsData?.weekly_stats) {
          const transformed = statsData.weekly_stats.map((day) => ({
            hari: new Date(day.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            }),
            hadir: day.present || 0,
            izin: day.absent || 0,
            alpha: day.alpha || 0,
            total: day.total || 0,
            attendance_rate: day.attendance_rate || 0,
          }))

          setWeeklyStats(transformed)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-7xl bg-white border border-gray-200 rounded-xl shadow-lg p-4 sm:p-6 mb-10">

        {/* COUNTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-4 pb-6">
          {isLoading
            ? counterConfig.map((_, i) => <CounterSkeleton key={i} />)
            : counterConfig.map((item) => (
                <CounterCard
                  key={item.key}
                  item={item}
                  value={counters[item.key]}
                />
              ))}
        </div>

        {/* CHART & TABLE */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ActivityTableSkeleton />
            </>
          ) : (
            <>
              <AttendanceChart weeklyStats={weeklyStats} />
              <ActivityTable activities={activities} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
