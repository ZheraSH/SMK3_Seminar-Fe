'use client'

import { useEffect, useState,useCallback } from 'react'
import { AlertTriangle, ChevronLeft, ChevronRight, CircleCheckBig, ClockAlert, ClipboardCheck, Search, RefreshCw} from 'lucide-react'
import Header from '@elements/header/header-new-1'
import LoadingData from '@elements/loading-data/loading'
import { getAbsenteeismMonitoring } from '@core/services/role-counselor/monitoring/absenteeism-monitoring'
import Pagination from './components/pagination'
import { useAttendanceMonitoring } from '@/cores/hooks/counselor/attendance-monitoring/use-attendance';

export default function AttendanceDashboard() {
  const [data, setData] = useState([])
  const [summary, setSummary] = useState({ hadir: 0, telat: 0, izin: 0, alpha: 0})
  const [loading, setLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const { attendance, error } = useAttendanceMonitoring();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const fetchMonitoring = useCallback(async () => {
    if (data.length > 0) {
    setIsSyncing(true);
  } else {
    setLoading(true);
  }
    try {
      const result = await getAbsenteeismMonitoring({ 
        page: currentPage, 
        search: debouncedSearch 
      });

      const students = result?.students || []
      const pagination = result?.pagination || {}

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
      setIsSyncing(false)
    }
  }, [currentPage, debouncedSearch,data.length]); 


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);


  useEffect(() => {
    fetchMonitoring();
  }, [fetchMonitoring]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 mb-10">
      <div className='hidden md:block'>
        {loading ? (<LoadingData loading={loading} type='header1' />)
          : (
            <Header span="Monitoring Kehadiran Siswa" p="Lihat perkembangan presensi siswa secara real-time" src="/images/particle/particle12.png"/>
          )}

      </div>

      <div className="max-w-10xl mx-auto ">
        {loading ? (
        <LoadingData loading={loading} type='attendanceChart' count={4} />
      ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 flex justify-between shadow-md">
                <div className="bg-[#22C55E] w-[4px] h-[52px] rounded-full" />
                <div>
                  <div className="text-3xl font-medium">{attendance?.hadir}</div>
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
                  <div className="text-3xl font-medium">{attendance.telat}</div>
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
                  <div className="text-3xl font-medium">{attendance.izin}</div>
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
                  <div className="text-3xl font-medium">{attendance.alpha}</div>
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
        
         
  
   {loading ? (
        <LoadingData loading={loading} type='create' count={4} />
      ) : (
     <>
     <div className="flex items-center mt-10 mb-10 border border-gray-400 rounded-2xl p-3 w-full w-full">
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
          
          <input
            type="text"
            placeholder="Cari Kelas/Nama..."
            className="md:w-52 w-full pl-10 pr-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search} 
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); 
            }}
          />
      </div>  

          
      <button
          onClick={() => fetchMonitoring()}
          disabled={isSyncing}
          className={`
          ml-4 bg-blue-500 text-white transition active:scale-95 disabled:opacity-50 flex items-center justify-center
           /* Tampilan Desktop (md ke atas) */
          md:w-32 md:h-10 md:rounded-xl 
          
          w-12 h-10 rounded-full
        `}
        >
           
           <span className="hidden md:block">
             {isSyncing ? "Syncing..." : "Sync Data"}
           </span>

           
           <div className="md:hidden">
            <RefreshCw 
              size={20} 
              className={isSyncing ? "animate-spin" : ""} 
            />
          </div>
      </button>
      </div>
     </>
   )}
  
        {loading || isSyncing ? (
        <LoadingData loading={true} type='tableSchedule' count={10} />
      ) : (
        <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#3B82F6] text-white">
                      <th className="px-6 py-4 text-left font-semibold tracking-wide">Nama</th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wide">Kelas</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Hadir</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Izin</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Sakit</th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">Alpha</th>
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

