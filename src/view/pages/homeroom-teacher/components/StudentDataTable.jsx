"use client";

import { ChevronDown, Download, RefreshCcw, Search } from 'lucide-react';
import { studentData } from '../../../../Core/Data/SiswaData';


export function StudentDataTable() {
  return (
    <div className="w-full mt-6">
      <h2 className="text-[24px] font-semibold mb-4">Data Siswa</h2>

      {/* FILTER BAR */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 border border-gray-700 rounded-[15px] px-3 py-2 w-[220px]">
          <Search className="w-[22px] h-[22px] text-black-500" />

          <input
            type="text"
            placeholder="Cari nama / NIS..."
            className="outline-none text-sm w-full placeholder-gray-700"
          />
        </div>

        <div className="border border-gray-700 rounded-[15px] px-3 py-2 text-sm flex items-center gap-2 w-fit">
          <select className="appearance-none bg-transparent outline-none text-sm pr-0">
            <option>Pilih Kategori</option>
            <option>Pilih Kategori</option>
          </select>

          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>

        <button className="border border-gray-700 rounded-[15px] px-3 py-2 text-sm flex items-center gap-2">
          <input type="date" />
        </button>
        <div className="flex-1"></div>
        <button className="bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm">
          <div className="flex gap-1.5">
            <Download className="w-5 h-5 " />
            <p>Export</p>
          </div>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
          <div className="flex gap-1.5">
            <RefreshCcw className="w-5 h-5 " />
            <p>Sync Data</p>
          </div>
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 font-medium rounded-tl-[7px]">No</th>
            <th className="py-3 px-4 font-medium">Nama</th>
            <th className="py-3 px-4 font-medium">NISN</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium">Tanggal</th>
            <th className="py-3 px-4 font-medium rounded-tr-[7px]">
              Catatan
            </th>
          </tr>
        </thead>

        <tbody>
          {studentData.map((item, i) => (
            <tr
              key={i}
              className="border border-gray-300  hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{i + 1}.</td>
              <td className="py-3 px-4">{item.nama}</td>
              <td className="py-3 px-4">{item.nisn}</td>

              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center justify-center px-5 py-[3px] rounded-lg text-xs font-semibold ${item.color}`}
                >
                  {item.status}
                </span>
              </td>

              <td className="py-3 px-4">5 Sep, 2025</td>

              <td className="py-3 px-4 text-gray-500">-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
