"use client";
import { Search, Plus } from "lucide-react";

export function RfidSearchBar({ search, onSearchChange, onAddClick }) {
  return (
    <div className="flex flex-row sm:items-center sm:justify-between my-7 gap-4">
      <div className="flex items-center w-full sm:w-[320px] h-[40px] border border-[#CBD5E1] rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2">
        <Search size={20} className="text-gray-600" />
        <input
          type="text"
          placeholder="Cari Nama Pengguna"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full outline-none text-[14px] bg-transparent placeholder:text-gray-600"
        />
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center justify-center bg-[#3B82F6] text-white px-2 rounded-full md:rounded-[12px] w-12 sm:w-[160px] h-[44px] shadow hover:bg-blue-700"
      >
        <Plus size={15} className="" />
        <span className=" hidden md:block">Tambah RFID</span>
      </button>
    </div>
  );
}

