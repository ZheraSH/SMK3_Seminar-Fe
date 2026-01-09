"use client";

import { useState } from "react";

export default function AttendanceTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const attendanceData = [
    // {
    //   id: 1,
    //   name: "Valeri Invandy Matabdir",
    //   nisn: "B0000000I",
    //   entryTime: "06:30",
    //   exitTime: "16:30",
    // },
    // {
    //   id: 2,
    //   name: "Valeri Invandy Matabdir",
    //   nisn: "B0000000I",
    //   entryTime: "06:30",
    //   exitTime: "16:30",
    // },
    // {
    //   id: 3,
    //   name: "Valeri Invandy Matabdir",
    //   nisn: "9B0000000I",
    //   entryTime: "06:30",
    //   exitTime: "16:30",
    // },
    // {
    //   id: 4,
    //   name: "Valeri Invandy Matabdir",
    //   nisn: "9B0000000I",
    //   entryTime: "06:30",
    //   exitTime: "16:30",
    // },
    // {
    //   id: 5,
    //   name: "Valeri Invandy Matabdir",
    //   nisn: "B0000000I",
    //   entryTime: "06:30",
    //   exitTime: "16:30",
    // },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = attendanceData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white rounded-sm shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900">Absensi Hari Ini</h2>
        <p className="text-sm text-gray-500 mt-1">Senin, 03 November 2025</p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto px-[25px]">
        {displayedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="/images/particle/homeroom01.png"
              alt="Belum ada absensi"
              className="w-100 mb-6"
            />

            <p className="text-gray-500 text-sm">
              Belum ada data absensi hari ini
            </p>
          </div>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  NISN
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Jam Masuk
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Jam Pulang
                </th>
              </tr>
            </thead>

            <tbody>
              {displayedData.map((record, index) => (
                <tr
                  key={record.id}
                  className="
            border-b border-gray-200
            odd:bg-blue-50
            even:bg-white
            hover:bg-blue-100
          "
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {record.nisn}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {record.entryTime || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {record.exitTime || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
