import { RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import FilterDropdown from "./components/FilterData";
import TableAttendanceBk from "./components/TableAttendance";
import Head from "./components/Head";
import StatisticsCrad from "./components/StatisticsCard";
import { Pagination } from "./components/Pagination";
import { getAbsenteeismMonitoring } from "../../../../Core/api/role-bk/monitoring/absenteeismMonitoring";

export default function MainMonitoringAbsen() {
    const [students, setStudents] = useState([]);
    const [recap, setRecap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState("Show all");
    const [lastUpdated, setLastUpdated] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); 
    };

    const fetchData = useCallback(async (params = {}, page = 1) => {
        setLoading(true);
        setError(null);

        try {
            if (searchQuery && Object.keys(params).length === 0) {
                params.search = searchQuery;
            }
            params.page = page; 

            const data = await getAbsenteeismMonitoring(params);
            if (!data) {
                setError("Data Monitoring Tidak Ditemukan");
                setStudents([]);
                setRecap({});
                setTotalPages(1);
                return;
            }

            setStudents(data.list.data || []);
            setRecap(data.recap || {});
            setTotalPages(data.list.meta?.last_page || 1);
            setCurrentPage(data.list.meta?.current_page || 1);

            setLastUpdated(new Date());
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data Izin");
            setStudents([]);
            setRecap({});
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchData({}, currentPage);
    }, [fetchData, currentPage]);

    
    const handleFilterSelect = (item, type) => {
        setSelectedFilter(item);
        setCurrentPage(1); 
        if (item === "Show all") {
            fetchData({}, 1);
        } else {
            fetchData({ [type]: item }, 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="justify-center mx-5 mb-10">
            <Head />
            <StatisticsCrad recap={recap} />
            <div className="flex justify-between mt-5">
                <div className="relative flex">
                    <div className="relative flex items-center w-80 mr-4">
                        <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari Kelas/Siswa...."
                            className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <FilterDropdown
                        students={students}
                        selected={selectedFilter}
                        onSelect={handleFilterSelect}
                    />
                </div>
                <button
                    className="flex items-center w-[128px] h-[37px] px-4 py-2 bg-[#3B82F6] rounded-lg transition text-sm text-white gap-2 shadow-md"
                    onClick={() => fetchData({}, 1)}
                >
                    <RefreshCw size={16} />
                    <p className="text-[14px] font-medium"> Sync Data</p>
                </button>
            </div>

            <div className="mt-4">
                <p className="flex justify-end text-[12px] font-light">
                    Terakhir diperbarui: {lastUpdated 
                        ? lastUpdated.toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : "–"}
                </p>

                <TableAttendanceBk
                    students={students}
                    loading={loading}
                    error={error}
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
