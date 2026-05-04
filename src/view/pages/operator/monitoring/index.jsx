import React from "react";
import { Search, RefreshCw, MoreVertical } from "lucide-react";
import { useMonitoring } from "@/cores/hooks/operator/monitoring/monitoring";
import DropdownFilter from "./components/dropdown-filter";
import Pagination from "./components/pagination";
import Headernew from "@elements/header/header-new-1";
import LoadingData from "@elements/loading-data/loading";

const MonitoringPage = () => {
    const {data, meta, loading, params, handleSearch, handleStatusFilter, handlePageChange, refreshData, searchTerm} = useMonitoring();

    return (
    <div className="bg-gray-50 min-h-screen mb-32 lg:mb-4">
        {(loading && data.length === 0) ? (
            <LoadingData loading={loading} type="header1" />
        ) : (
            <Headernew  span="Monitoring Kehadiran Siswa"  p={`Daftar absensi RFID secara real-time`}  src="/images/particle/particle11.png" />
        )}
        {(loading && data.length === 0) ? (
            <LoadingData loading={loading} type="create" />
        ) : (
        <header className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex items-center flex-grow lg:w-80">
                    <Search className="absolute left-3 text-gray-400 w-4 h-4" />
                    <input type="text"  placeholder="Cari Nama, Kelas..."  value={searchTerm}  onChange={(e) => handleSearch(e.target.value)}  className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all"/>
                </div>
                <button type="button" onClick={refreshData} disabled={loading} className="lg:hidden flex items-center justify-center p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all shadow-sm active:scale-95 disabled:opacity-50 shrink-0">
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
                <div className="hidden lg:block ml-2">
                    <DropdownFilter onSelect={handleStatusFilter} currentStatus={params.status} />
                </div>
            </div>
            <button  type="button"  onClick={refreshData}  disabled={loading}  className="hidden lg:flex items-center justify-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
            </button>
            <div className="block lg:hidden w-full">
                <DropdownFilter onSelect={handleStatusFilter} currentStatus={params.status} />
            </div>
        </header>
        )}
        {loading ? (
            <LoadingData loading={loading} type="activityTable" />
        ) : data.length === 0 && params.search === "" && params.status === "" ? (
            <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
                <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
                <p className="text-gray-500 text-center text-sm md:text-md"> 
                    datanya belum ada, <br /> 
                    silahkan lakukan tab RFID siswa terlabih dahulu!
                </p>
            </div>
        ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#3B82F6] text-white">
                                <th className="px-4 py-4 font-semibold whitespace-nowrap text-[12px] rounded-tl-xl text-center">No</th>
                                <th className="px-3 py-4 font-semibold whitespace-nowrap text-[12px] text-center">Waktu Masuk</th>
                                <th className="px-3 py-4 font-semibold whitespace-nowrap text-[12px] text-center">-</th>
                                <th className="px-3 py-4 font-semibold whitespace-nowrap text-[12px] text-center">Waktu Keluar</th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap text-[12px] text-center">Nama</th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap text-[12px] text-center">Kelas</th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap text-[12px] text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={item.id}  className={ index % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50 hover:bg-slate-100"}>
                                        <td className="px-4 py-4 text-sm text-gray-600 text-center">
                                            {(meta.current_page - 1) * meta.per_page + index + 1}.
                                        </td>
                                        <td className={`px-3 py-4 text-[14px] font-medium text-center ${
                                            (item.status === 'terlambat' || item.status === 'alpha' || item.status === 'sakit') ? 'text-[#EF4444]' : 'text-[#3B82F6]'
                                        }`}>
                                            {item.checkin_time || "--:--"}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-400 text-center">-</td>
                                        <td className="px-3 py-4 text-[14px] font-medium text-blue-600 text-center">
                                            {item.checkout_time || "15:15"}
                                        </td>
                                        <td className="px-6 py-4 text-[14px] whitespace-nowrap text-center text-gray-700 font-medium">
                                            {item.student_name}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 bg-[#00C4E6] text-white text-xs font-bold rounded-full">
                                                {item.classroom}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-4 py-1 rounded-[6px] text-xs font-medium ${
                                                item.status === 'hadir' 
                                                    ? 'bg-[#DBFFEE] text-[#047857]' 
                                                    : item.status === 'terlambat'
                                                    ? 'bg-[#FEF3C7] text-[#F59E0B]'
                                                    : item.status === 'sakit'
                                                    ? 'bg-purple-100 text-purple-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}>
                                                {item.status_label}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                                        Data tidak ditemukan untuk filter ini
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {!loading && meta.last_page > 1 && (
            <Pagination meta={meta} onPageChange={handlePageChange} />
        )}
    </div>
    );
};

export default MonitoringPage;
