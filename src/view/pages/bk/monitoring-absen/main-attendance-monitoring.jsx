'use client'

import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  ClockAlert,
  ClipboardCheck
} from 'lucide-react'
import Header from '../../../components/elements/header/Header-new'
import LoadingData from '../../../components/elements/loadingData/loading'

export default function AttendanceDashboard() {
  const [data, setData] = useState([])
  const [summary, setSummary] = useState({
    hadir: 0,
    telat: 0,
    izin: 0,
    alpha: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMonitoring = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          'http://127.0.0.1:8000/api/counselor/attendance/monitoring-global'
        )

        const result = await res.json()

        const students = result?.data?.students || []

        const summaryResult = students.reduce(
          (acc, cur) => {
            acc.hadir += cur.hadir
            acc.izin += cur.izin
            acc.alpha += cur.alpha
            return acc
          },
          { hadir: 0, telat: 0, izin: 0, alpha: 0 }
        )
        console.log(res.data.data)
        setData(students)
        setSummary(summaryResult)
      } catch (err) {
        console.error('Fetch monitoring-global gagal:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMonitoring()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className='hidden md:block'>
        {loading? (<LoadingData loading={loading} type='header1' />)
        :(
          <Header
            span="Monitoring Kehadiran Siswa"
            p="Lihat perkembangan presensi siswa secara real-time"
            src="/images/particle/particle12.png"
          />
        )}

      </div>

      <div className="max-w-7xl mx-auto">
        {loading? (<LoadingData loading={loading} type='attendanceChart' count={4}/>)
        :(
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 flex justify-between shadow-md">
              <div className="bg-[#22C55E] w-[4px] h-[52px] rounded-full" />
              <div>
                <div className="text-3xl font-medium">{summary.hadir}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Total Siswa Hadir
                </div>
              </div>
              <div className="w-12 h-12 bg-[#DBFFEE] rounded-md flex items-center justify-center">
                <CircleCheckBig className="text-[#22C55E]" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex justify-between shadow-md">
              <div className="bg-[#F59E0B] w-[4px] h-[52px] rounded-full" />
              <div>
                <div className="text-3xl font-medium">{summary.telat}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Total Siswa Telat
                </div>
              </div>
              <div className="w-12 h-12 bg-[#FEF3C7] rounded-md flex items-center justify-center">
                <ClockAlert className="text-[#F59E0B]" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex justify-between shadow-md">
              <div className="bg-[#0EA5E9] w-[4px] h-[52px] rounded-full" />
              <div>
                <div className="text-3xl font-medium">{summary.izin}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Total Siswa Izin
                </div>
              </div>
              <div className="w-12 h-12 bg-[#DBEAFE] rounded-md flex items-center justify-center">
                <ClipboardCheck className="text-[#0EA5E9]" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 flex justify-between shadow-md">
              <div className="bg-[#EF4444] w-[4px] h-[52px] rounded-full" />
              <div>
                <div className="text-3xl font-medium">{summary.alpha}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Total Siswa Alpha
                </div>
              </div>
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-md flex items-center justify-center">
                <AlertTriangle className="text-[#EF4444]" />
              </div>
            </div>
          </div>
        )}

        {loading? (<LoadingData loading={loading} type='tableSchedule' count={10}/>) 
        : (
          <>
            <div className="bg-white rounded-lg  overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr className="grid grid-cols-6">
                    <th className="px-6 py-3 text-left">Nama</th>
                    <th className="px-6 py-3 text-left">Kelas</th>
                    <th className="px-6 py-3 text-left">Hadir</th>
                    <th className="px-6 py-3 text-left">Izin</th>
                    <th className="px-6 py-3 text-left">Sakit</th>
                    <th className="px-6 py-3 text-left">Alpha</th>
                  </tr>
                </thead>

                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center  py-6">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    data.map((row, i) => (
                      <tr
                        key={i}
                        className={`grid grid-cols-6 border-b ${
                          i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <td className="px-6 py-3">{row.student_name}</td>
                        <td className="px-6 py-3">{row.classroom}</td>
                        <td className="px-6 py-3">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs">
                            {row.hadir}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-xs">
                            {row.izin}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs">
                            {row.sakit}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs">
                            {row.alpha}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              <button className="p-2">
                <ChevronLeft />
              </button>
              <button className="w-8 h-8 bg-blue-500 text-white rounded">1</button>
              <button className="p-2">
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
