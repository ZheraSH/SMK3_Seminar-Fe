import React, { useState } from "react";
import { CircleCheck, Clock, ClipboardCheck, TriangleAlert, CalendarCog, Search, Download, RefreshCw, ChevronRight } from "lucide-react";
import TableRecap from "./components/TableAttendance";
import CardRecap from "./components/CardRecap";
import {UseRecap} from "../../../../Core/hooks/Homeroom-teacher/Recap";
import Header from "../../../components/elements/header/Header-new";
import Pagination from "./components/Paginition";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function RecapClass() {
  const getTodayDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const adjustedDate = new Date(today.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  };
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Semua Status");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { header,card,table,pagination,goToPage,loading,calculateNumber,searchQuery,setSearchQuery,refreshData,downloading,downloadRecap,selectedStatus,setSelectedStatus } = UseRecap(selectedDate);

  const formatDate = (dateString) => {
        if (!dateString) return "-";
        
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return "-";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };


    const handleRefresh = () => {
        refreshData()
        setIsRefreshing(true);
        setTimeout(() => { setIsRefreshing(false); }, 2000);
    };

  const data = [
    { title: "Total Hadir", value: card.count?.present, color: "#4CAF50", color2: "#DBFFEE", IconComponent: CircleCheck },
    { title: "Total Siswa Telat",value: card.count?.late, color: "#FF9800", color2: "#FEF3C7", IconComponent: Clock },
    { title: "Total Siswa Izin", value:card.count?.permission, color: "#2196F3", color2: "#DBEAFE", IconComponent: ClipboardCheck },
    { title: "Total Siswa Alpha", value:card.count?.alpha, color: "#F44336", color2: "#FEE2E2", IconComponent: TriangleAlert },
  ];

  return (
    <div className=" bg-[#F8FAFC] min-h-screen mb-10 md:mb-0">
      <div className="">
        <div>
          {loading ? (<LoadingData loading={loading} type="header1"/>)
          :(
            <Header span={`Recap Absensi - ${header?.classroom?.name ?? "-"}`} p={`Tahun Ajaran ${header?.tahun_ajaran} • Jumlah Siswa: ${header?.total_students}`} src="/images/particle/particle10.png" />
          )}
        </div>
        {loading?(<LoadingData loading={loading} type="attendanceChart" count={4} />)
        :(
          <CardRecap data={data}/>
        )}
        {loading? (<LoadingData loading={loading} type="create"/>)
        :(
          <div className="flex flex-col md:flex-row md:items-center  justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row flex-wrap items-center gap-4">
              <div className="relative w-full md:w-[250px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari Nama, NISN..." className="w-full h-[45px] bg-gray-50 rounded-full pl-12 pr-4 border border-gray-200 focus:border-blue-400 focus:bg-white outline-none transition-all text-sm"/>
              </div>

              <div className="relative w-full md:w-[160px]">
                <div onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-white w-full rounded-full h-[45px] flex items-center justify-between px-5 border border-gray-200 hover:border-blue-400 cursor-pointer transition-all text-sm font-medium text-gray-600 shadow-sm">
                  <span>{selectedFilter}</span>
                  <ChevronRight size={16} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-90' : ''}`} />
                </div>

                {isFilterOpen && (
                  <div className="absolute top-[50px] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {["Semua Status", "Hadir", "Sakit", "Izin", "Alpha"].map((status) => (
                      <div key={status} onClick={() => { setSelectedFilter(status); 
                          const statusMap = { "Semua Status": "", "Hadir": "hadir", "Sakit": "sakit", "Izin": "izin", "Alpha": "alpha"};
                          setSelectedStatus(statusMap[status]);
                          setIsFilterOpen(false); 
                        }} 
                        className="px-5 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative w-full md:w-[170px] h-[45px] group">
                <div className="absolute inset-0 z-0 bg-white rounded-full border border-gray-200 flex items-center justify-between px-5 pointer-events-none group-hover:border-blue-400 transition-all">
                  <span className="text-sm font-semibold text-gray-600">{formatDate(selectedDate)}</span>
                  <CalendarCog size={18} className="text-gray-400" />
                </div>
                <input type="date" value={selectedDate} 
    onChange={(e) => setSelectedDate(e.target.value)}  className="absolute inset-0 lg:w-[150px] md:w-[180px] w-[350px] h-full opacity-0 cursor-pointer z-10" />
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 justify-end">
              <button onClick={downloadRecap} disabled={downloading} className="flex-1 md:flex-none bg-[#3B82F6] hover:bg-blue-600 h-[45px] px-3 rounded-lg text-white flex items-center justify-center transition-all shadow-md active:scale-95">
                <Download size={18} strokeWidth={2.5} className="mr-2"/>
                <span className="font-semibold text-sm whitespace-nowrap">Cetak Rekap</span>
              </button>
              <button onClick={handleRefresh} className="bg-[#22C55E] hover:bg-green-600 h-[45px] px-3 rounded-lg text-white flex items-center justify-center transition-all shadow-md active:scale-95 gap-2">
                <RefreshCw size={18} strokeWidth={2.5} className={`${isRefreshing ? "animate-spin" : ""}`}/>
                <span className="font-semibold text-sm hidden md:block ">Sync</span>
              </button>
            </div>
          </div>
        )}
       {loading?(
        <LoadingData loading={loading} type="tableSchedule" count={10} />
       ):
        table.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-20  mt-4 animate-in fade-in duration-700">
            <img  src="/images/null/null4.png"  alt="Data Kosong"  className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
            <p className="text-gray-500 text-center text-sm md:text-md"> Sepertinya belum ada data yang masuk untuk kriteria ini <br /> Coba ubah kata kunci pencarian atau filter Anda.!</p>
          </div>
        ) : (
          <>
           <TableRecap table={table} calculateNumber={calculateNumber}/>
            {
              pagination.last_page > 1 && (
                  <Pagination pagination={pagination} goToPage={goToPage}/>
              )
            } 
           </>
        )
       }
      </div>
    </div>
  );
}