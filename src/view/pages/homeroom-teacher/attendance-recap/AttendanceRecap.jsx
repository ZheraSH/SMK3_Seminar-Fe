import React, { useState } from "react";
import { CircleCheck, Clock, ClipboardCheck, TriangleAlert, CalendarCog, Search, Download, RefreshCw, ChevronRight } from "lucide-react";
import 

export default function RecapClass() {
  const [selectedDate, setSelectedDate] = useState("2025-09-05");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Semua Status");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

  const data = [
    { title: "Total Hadir", value: 1200, color: "#4CAF50", color2: "#DBFFEE", IconComponent: CircleCheck },
    { title: "Total Siswa Telat", value: 2, color: "#FF9800", color2: "#FEF3C7", IconComponent: Clock },
    { title: "Total Siswa Izin", value: 4, color: "#2196F3", color2: "#DBEAFE", IconComponent: ClipboardCheck },
    { title: "Total Siswa Alpha", value: 2, color: "#F44336", color2: "#FEE2E2", IconComponent: TriangleAlert },
  ];

  const Datatable = [
    { nisn: "00123456", name: "Ahmad Fauzi", status: "Hadir", time: "5 Sebtember, 2025" },
    { nisn: "00123457", name: "Siti Aminah", status: "Sakit", time: "5 Sebtember, 2025" },
    { nisn: "00123458", name: "Budi Santoso", status: "Izin", time: "-" },
    { nisn: "00123459", name: "Dewi Lestari", status: "Alpha", time: "-" },
    { nisn: "00123460", name: "Rina Wijaya", status: "Hadir", time: "5 Sebtember, 2025" },
  ];


  return (
    <div className=" bg-[#F8FAFC] min-h-screen mb-40 md:mb-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {data.map((item, index) => (
            <div key={index} className="bg-white flex flex-row p-4 h-[100px] rounded-xl shadow-sm border border-gray-100 items-center justify-between">
              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: item.color }} className="h-[52px] w-[4px] rounded-full"></div>
                <div className="flex flex-col">
                  <p className="text-[22px] md:text-[24px] font-bold leading-tight">{item.value}</p>
                  <h2 className="text-[12px] text-gray-400 font-medium">{item.title}</h2>
                </div>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl flex justify-center items-center" style={{ backgroundColor: item.color2 }}>
                <item.IconComponent color={item.color} size={22} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center  justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row flex-wrap items-center gap-4">
            <div className="relative w-full md:w-[250px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Cari Nama, NISN..." className="w-full h-[45px] bg-gray-50 rounded-full pl-12 pr-4 border border-gray-200 focus:border-blue-400 focus:bg-white outline-none transition-all text-sm"/>
            </div>

            <div className="relative w-full md:w-[160px]">
              <div onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-white w-full rounded-full h-[45px] flex items-center justify-between px-5 border border-gray-200 hover:border-blue-400 cursor-pointer transition-all text-sm font-medium text-gray-600 shadow-sm">
                <span>{selectedFilter}</span>
                <ChevronRight size={16} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-90' : ''}`} />
              </div>

              {isFilterOpen && (
                <div className="absolute top-[50px] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {["Semua Status", "Hadir", "Sakit", "Izin", "Alpha"].map((status) => (
                    <div key={status} onClick={() => { setSelectedFilter(status); setIsFilterOpen(false); }} className="px-5 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full md:w-[170px] h-[45px] group">
              <div className="absolute inset-0 z-0 bg-white rounded-full border border-gray-200 flex items-center justify-between px-5 pointer-events-none group-hover:border-blue-400 transition-all">
                <span className="text-sm font-semibold text-gray-600">{formatDateDisplay(selectedDate)}</span>
                <CalendarCog size={18} className="text-gray-400" />
              </div>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="absolute inset-0 lg:w-[150px] md:w-[180px] w-[350px] h-full opacity-0 cursor-pointer z-10" />
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 justify-end">
            <button className="flex-1 md:flex-none bg-[#3B82F6] hover:bg-blue-600 h-[45px] px-3 rounded-lg text-white flex items-center justify-center transition-all shadow-md active:scale-95">
              <Download size={18} strokeWidth={2.5} className="mr-2"/>
              <span className="font-semibold text-sm whitespace-nowrap">Cetak Rekap</span>
            </button>
            <button onClick={handleRefresh} className="bg-[#22C55E] hover:bg-green-600 h-[45px] px-3 rounded-lg text-white flex items-center justify-center transition-all shadow-md active:scale-95 gap-2">
              <RefreshCw size={18} strokeWidth={2.5} className={`${isRefreshing ? "animate-spin" : ""}`}/>
              <span className="font-semibold text-sm hidden md:block ">Sync</span>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-[14px]">
              <thead className="bg-[#3B82F6]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-white text-center whitespace-nowrap">No</th>
                  <th className="px-6 py-4 font-semibold text-white text-center whitespace-nowrap">Foto</th>
                  <th className="px-6 py-4 font-semibold text-white text-center whitespace-nowrap">Nisn</th>
                  <th className="px-6 py-4 font-semibold text-white text-center whitespace-nowrap">Nama</th>
                  <th className="px-6 py-4 font-semibold text-white text-center whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-semibold text-white text-center whitespace-nowrap">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Datatable.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 1 ? 'bg-indigo-50/30' : 'bg-white'} hover:bg-blue-50/50 transition-colors`}>
                    <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                          <img/>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-600 whitespace-nowrap">{item.nisn}</td>
                    <td className="px-6 py-4 font-medium text-center text-gray-700 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-[12px] font-medium text-white
                        ${item.status === "Hadir" ? "bg-[#22C55E]" : 
                          item.status === "Sakit" ? "bg-[#F59E0B]" : 
                          item.status === "Izin" ? "bg-[#0EA5E9]" : "bg-[#EF4444]"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-500 whitespace-nowrap">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}