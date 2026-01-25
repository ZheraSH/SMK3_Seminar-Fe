"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Header from "../../../components/elements/header/Header-new";

const dummyData = Array(10).fill({
  name: "Nasihuy yustia ramadhani",
  email: "Nasihuy@gmail.com",
  rfid: "0000000000",
});

export default function MasterCard() {
  const [search, setSearch] = useState("");

  const filteredData = dummyData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.rfid.includes(search)
  );

  return (
    <div className="p-6 space-y-6">
      {/* HEADER CARD */}
        <Header
        span="Master Card"
        p="Data inti dan identitas siswa"
        src="/images/particle/mastercard.png"
        />

      {/* SEARCH & BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center w-full max-w-full sm:max-w-[300px] md:max-w-[320px] border rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2 border-[#CBD5E1]">
          <Search size={20} className="text-gray-600 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari nama / NIS / Kelas..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full outline-none text-sm bg-transparent placeholder:text-gray-600"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus size={16} />
          master key
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#3B82F6] text-white">
              <th className="px-4 py-3 text-sm font-semibold border-r border-blue-500">
                No
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-r border-blue-500">
                Nama
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-r border-blue-500">
                Email
              </th>
              <th className="px-4 py-3 text-sm font-semibold">RFID</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3 border-b border-gray-200">
                  {idx + 1}.
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {item.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {item.email}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {item.rfid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
