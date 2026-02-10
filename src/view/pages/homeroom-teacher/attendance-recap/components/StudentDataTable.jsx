"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Download, RefreshCcw, Search } from "lucide-react";
import { fetchSummaryClassdaily } from "../../../../../Core/api/role-homeroom/summary-class/SummaryClass";

export function StudentDataTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const today = new Date().toISOString().split("T")[0];
        const data = await fetchSummaryClassdaily(today);
        setStudents(data?.students ?? []);
      } catch (err) {
        console.error("Student table error:", err);
        setError(true);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full mt-6">
      <h2 className="text-[24px] font-semibold mb-4">Data Siswa</h2>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 border border-gray-700 rounded-[15px] px-3 py-2 w-full sm:w-[220px]">
          <Search className="w-[22px] h-[22px]" />
          <input
            type="text"
            placeholder="Cari nama / NIS..."
            className="outline-none text-sm w-full"
          />
        </div>

        <div className="border border-gray-700 rounded-[15px] px-3 py-2 text-sm flex items-center gap-2 w-full sm:w-fit">
          <select className="appearance-none bg-transparent outline-none text-sm pr-0 w-full sm:w-fit">
            <option>Pilih Kategori</option>
            <option>Kehadiran</option>
          </select>
          <ChevronDown className="w-4 h-4" />
        </div>

        <button className="border border-gray-700 rounded-[15px] px-3 py-2 text-sm flex items-center gap-2 w-full sm:w-fit">
          <input type="date" className="bg-transparent outline-none" />
        </button>

        <div className="flex sm:ml-auto gap-3 w-full sm:w-fit">
          <button className="bg-[#10B981] text-white px-4 py-2 rounded-[12px] text-sm w-full sm:w-fit">
            <div className="flex justify-center gap-1.5">
              <Download className="w-5 h-5" />
              <p>Export</p>
            </div>
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-[12px] text-sm flex items-center gap-1.5">
            <RefreshCcw className="w-5 h-5" />
            Sync Data
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Nama</th>
              <th className="py-3 px-4">NISN</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Catatan</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Mengambil data…
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-red-500">
                  Data gagal dimuat
                </td>
              </tr>
            )}

            {!loading && !error && students.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Tidak ada data absensi hari ini
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              students.map((item, i) => (
                <tr
                  key={item.student_uuid}
                  className="border border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{item.student_name}</td>
                  <td className="py-3 px-4">{item.nisn}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-5 py-[3px] rounded-lg text-xs font-semibold ${
                        item.status === "alpha"
                          ? "bg-red-100 text-red-700"
                          : item.status === "permission"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "sick"
                          ? "bg-yellow-200 text-yellow-900"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4 text-gray-500">-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
