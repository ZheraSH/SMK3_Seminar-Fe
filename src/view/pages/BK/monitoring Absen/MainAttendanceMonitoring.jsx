import { RefreshCw } from "lucide-react";
import FilterDropdown from "./components/FilterData";
import TableAttendanceBk from "./components/TableAttendance";
import Head from "./components/Head";
import { Pagination } from "./components/Pagination";
import { useAttendanceMonitoring } from "../../../../Core/hooks/bk-hooks/AttendanceMonitoring/useAttendance";
import useMaster from "../../../../Core/hooks/bk-hooks/AttendanceMonitoring/useMaster";

export default function MainMonitoringAbsen() {
    const {
    students,
    loading,
    error,
    searchQuery,
    selectedFilter,
    lastUpdated,
    currentPage,
    totalPages,
    noData,
    handleSearchChange,
    handleFilterSelect,
    handlePageChange,
    fetchData,
} = useAttendanceMonitoring();

    const{majors,classroom}=useMaster();


    return (
        <div className="justify-center mx-2 lg:mx-5 mb-10">
            <Head />
            <div className="flex justify-between mt-5 gap-1">
                <div className="relative flex">
                    <div className="relative flex items-center w-[180px] md:w-80 mr-2 md:mr-4">
                        <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari Kelas/Siswa...."
                            className="p-2 pl-10 border border-gray-300 rounded-full w-[180px] md:w-full focus:outline-none text-[10px] md:text-[16px] focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <FilterDropdown
                        majors={majors}
                        classroom={classroom}
                        students={students}
                        selected={selectedFilter}
                        onSelect={handleFilterSelect}
                    />
                </div>
                <button
                    className="flex items-center w-auto md:w-[128px] h-[37px] px-1 md:px-4 py-2 bg-[#3B82F6] rounded-lg transition text-sm text-white gap-1 md:gap-2 shadow-md"
                    onClick={() => fetchData({}, 1)}
                >
                    <RefreshCw size={16} />
                    <p className=" text-[8px] md:text-[14px] font-medium"> Sync Data</p>
                </button>
            </div>

            <div className="mt-4">
                <p className="flex justify-end text-[12px] font-light mb-[5px]">
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

                <div className=" overflow-auto lg:overflow-hidden w-full px-2 md:px-3">
                    {noData ? (
                        <p className="text-center text-gray-500 text-lg py-4">
                            Data tidak ditemukan
                        </p>
                    ) : (
                        <TableAttendanceBk
                            students={students}
                            loading={loading}
                            error={error}
                        />
                    )}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

            </div>
        </div>
    );
}
