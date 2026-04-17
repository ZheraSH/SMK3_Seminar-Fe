'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, ChevronLeft, ChevronRight, CircleCheckBig, ClockAlert, ClipboardCheck} from 'lucide-react'
import Header from '@elements/header/Header-new'
import LoadingData from '@elements/loading-data/loading'
import { getAbsenteeismMonitoring } from '@/core/services/role-counselor/monitoring/absenteeism-monitoring'
import Pagination from './components/pagination'

export default function AttendanceDashboard() {
  const [data, setData] = useState([])
  const [summary, setSummary] = useState({ hadir: 0, telat: 0, izin: 0, alpha: 0})
  const [loading, setLoading] = useState(true)

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    const fetchMonitoring = async () => {
      setLoading(true)
      try {
        const result = await getAbsenteeismMonitoring({ page: currentPage })

        const students = result?.students || []
        const pagination = result?.pagination || {}
        
        console.log("Students data fetched:", students)
        console.log("Pagination data fetched:", pagination)

        const summaryResult = students.reduce(
          (acc, cur) => {
            acc.hadir += cur.hadir || 0
            acc.izin += cur.izin || 0
            acc.alpha += cur.alpha || 0
            return acc
          },
          { hadir: 0, telat: 0, izin: 0, alpha: 0 }
        )
        setData(students)
        setSummary(summaryResult)
        setLastPage(pagination.last_page || 1)
      } catch (err) {
        console.error('Fetch monitoring-global gagal:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMonitoring()
  }, [currentPage])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className='hidden md:block'>
        {loading ? (<LoadingData loading={loading} type='header1' />)
          : (
            <Header span="Monitoring Kehadiran Siswa" p="Lihat perkembangan presensi siswa secara real-time" src="/images/particle/particle12.png"/>
          )}

      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (<LoadingData loading={loading} type='attendanceChart' count={4} />)
          : (
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

        {loading ? (<LoadingData loading={loading} type='tableSchedule' count={10} />)
          : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#3B82F6] text-white">
                      <th className="px-6 py-4 text-left font-semibold tracking-wide">Nama</th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide">Kelas</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Hadir</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Izin</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Sakit</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Alpa</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-gray-500 italic">
                          Tidak ada data tersedia
                        </td>
                      </tr>
                    ) : (
                      data.map((row, i) => (
                        <tr
                          key={i}
                          className={`transition-colors hover:bg-blue-50/30 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-6 py-4 text-gray-700 font-medium capitalize">
                            {row.student_name.toLowerCase()}
                          </td>
                          <td className="px-6 py-4 text-gray-600 uppercase text-sm">
                            {row.classroom}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-emerald-50 text-emerald-600 font-semibold border border-emerald-100">
                              {row.hadir}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-amber-50 text-amber-600 font-semibold border border-amber-100">
                              {row.izin}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-blue-50 text-blue-600 font-semibold border border-blue-100">
                              {row.sakit}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-red-50 text-red-600 font-semibold border border-red-100">
                              {row.alpha}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {data.length > 0 && (
                <Pagination  currentPage={currentPage} totalPages={lastPage} onPageChange={(page) => setCurrentPage(page)}/>
              )}
            </>
          )}
      </div>
    </div>
  )
}

