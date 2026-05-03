"use client";

import React, { useEffect, useState } from "react";
import { fetchTapHistory } from "@core/services/role-operator/dashboard/dashboard-api";
import { Search, RefreshCcw } from "lucide-react";
import ClassDropdown from "./class-dropdown";
import Pagination from "./pagination";
import LoadingData from "@elements/loading-data/loading";

export default function AttendanceTableSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadData = async (currentPage = page) => {
    setLoading(true);
    try {
      const result = await fetchTapHistory(selectedClassroom, searchTerm, currentPage);
      if (result && result.data) {
        setData(result.data);
        setLastPage(result.meta.last_page || 1);
      }
    } catch (error) {
      console.error("Failed to fetch tap history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (newPage) => {
    setPage(newPage);
    loadData(newPage);
  };

  useEffect(() => {
    setPage(1);
    loadData(1);
  }, [selectedClassroom]);

  // Handle search with a small delay (debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      loadData(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case "hadir":
        return "bg-green-100 text-green-700";
      case "terlambat":
        return "bg-yellow-100 text-yellow-700";
      case "izin":
        return "bg-blue-100 text-blue-700";
      case "sakit":
        return "bg-purple-100 text-purple-700";
      case "alpha":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <LoadingData loading={loading} type="activityTable" />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 pb-[14px] gap-4">
        <h2 className="text-lg font-bold text-slate-800">
          Monitoring Kehadiran Hari Ini
        </h2>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, kelas..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* CUSTOM DROPDOWN COMPONENT */}
          <div className="flex flex-row gap-4">
            <ClassDropdown
              selectedId={selectedClassroom}
              onSelect={(id) => setSelectedClassroom(id)}
            />

            {/* REFRESH BUTTON */}
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-all shadow-sm shadow-emerald-200"
            >
              <span>Refresh</span>
              <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-3 pb-2 h-[285px] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              {["No", "Waktu Tap", "Nama", "Kelas", "Status"].map(
                (h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-xs whitespace-nowrap font-medium ${i === 0 ? "rounded-tl-lg" : ""
                      } ${i === 4 ? "rounded-tr-lg" : ""
                      } border-b border-blue-700`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="border border-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-sm text-slate-500 py-20"
                >
                  Belum ada data kehadiran hari ini
                </td>
              </tr>
            ) : (
              data.map((r, i) => (
                <tr
                  key={r.id || i}
                  className={
                    i % 2 === 0
                      ? "bg-white hover:bg-slate-50"
                      : "bg-slate-50 hover:bg-slate-100"
                  }
                >
                  <td className="px-4 py-3 text-sm border-b border-gray-200">
                    {i + 1}.
                  </td>

                  <td
                    className={`px-4 py-3 font-medium text-[14px] border-b border-gray-200 ${r.status === "terlambat"
                      ? "text-yellow-600"
                      : "text-blue-600"
                      }`}
                  >
                    {r.checkin_time}
                  </td>

                  <td className="px-4 py-3 font-medium text-[14px] border-b border-gray-200">
                    {r.student_name}
                  </td>

                  <td className="px-4 py-3 font-medium text-[14px] border-b border-gray-200">
                    {r.classroom}
                  </td>

                  <td className="px-4 py-3 text-[14px] border-b border-gray-200">
                    <span
                      className={`px-3 py-1 rounded-[5px] text-xs font-semibold ${getStatusColor(r.status)}`}
                    >
                      {r.status_label || r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        lastPage={lastPage}
        onPageClick={handlePageClick}
      />
    </div>
  );
}

