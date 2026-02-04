"use client";
import { Search, Plus } from "lucide-react";

export function RfidSearchBar({ search, onSearchChange, onAddClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-7 gap-4">
      {/* SEARCH BOX */}
      <div className="flex items-center w-full sm:w-[320px] h-[40px] border border-gray-500 rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2">
        <Search size={20} className="text-black" />
        <input
          type="text"
          placeholder="Cari Nama/NISN"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full outline-none text-[14px] bg-transparent placeholder:text-black"
        />
      </div>

      {/* TOMBOL ADD */}
      <button
        onClick={onAddClick}
        className="flex items-center justify-center bg-[#3B82F6] text-white px-2 rounded-[12px] w-full sm:w-[160px] h-[44px] shadow hover:bg-blue-700"
      >
        <Plus size={15} className="mr-2" />
        Tambah RFID
      </button>
    </div>
  );
}
