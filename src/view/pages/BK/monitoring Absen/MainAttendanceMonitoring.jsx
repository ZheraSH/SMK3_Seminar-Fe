import { RefreshCw} from "lucide-react";
import { useEffect, useState } from "react";
import { Pagination } from "./components/Pagination";
import FilterDropdown from "./components/FilterData";
import TableAttendanceBk from "./components/TableAttendance";
import { attendanceStats,studentsData } from "../../../../Core/Data/BkData";
import Head from "./components/Head";
import StatisticsCrad from "./components/StatisticsCard";
import { getAbsenteeismMonitoring } from "../../../../Core/api/role-bk/monitoring/absenteeismMonitoring";


export default function MainMonitoringAbsen () {
    const [students, setStudents] = useState([]);
    const [recap,setRecap] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        setError(null);

        getAbsenteeismMonitoring()
        .then((data) => {
        if (!data) {
          setError("Data Izin Tidak Ditemukan");
          return;
        }
        setStudents(data.list.data || []);
        setRecap(data.recap || []);
      })
      .catch(() => {
        setError("Gagal memuat data Izin");
        setStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    // hitung total halaman
    const totalPages = Math.ceil(studentsData.length / rowsPerPage);

    // potong data untuk ditampilkan di table
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentStudents = studentsData.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
    };


    return (
        <div className="justify-center mx-5 mb-10">
            <Head />
            <StatisticsCrad attendanceStats= {attendanceStats} recap={recap}/>
            <div className=" flex justify-between mt-5">
                <div className="relative flex">
                        <div className="relative flex items-center w-80 mr-4">
                        <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                            </path>
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari Kelas/Siswa...."
                            className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <FilterDropdown  students={students}/>
                </div>
                <button 
                    className="flex items-center w-[128px] h-[37px] px-4 py-2 bg-[#3B82F6] rounded-lg transition text-sm text-white gap-2 shadow-md"
                >
                    <RefreshCw size={16}  />
                    <p className="text=[14px] font-medium"> Sync Data</p>
                </button>
            </div>
            <div className="mt-4">
                <p className="flex justify-end text-[12px] font-light">Terakhir diperbarui: 06 Nov 2025, 09.42 WIB</p>
                <TableAttendanceBk 
                    students={students}
                    loading={loading}
                   
                />
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
      </div>
    );
}