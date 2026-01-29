"use client";

import React, { useEffect, useState } from "react";
import { fetchTapHistory } from "../../../../../Core/api/role-operator/dashboard/DashboardApi";

export default function AttendanceTableSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTapHistory();
        if (Array.isArray(result)) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch tap history:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <h2 className="text-lg font-semibold p-6 pb-[14px]">
        Monitoring Kehadiran Hari Ini
      </h2>

      <div className="overflow-x-auto px-3 pb-5 h-[285px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              {["No", "Waktu Tap", "Nama", "Kelas", "Status"].map(
                (h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-xs font-medium ${i === 0 ? "rounded-tl-lg" : ""
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
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
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
    </div>
  );
}
