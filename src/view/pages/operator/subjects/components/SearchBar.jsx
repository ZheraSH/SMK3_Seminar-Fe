"use client";

import { Search, Plus } from "lucide-react";

export function SearchBar({ search, onSearchChange, onAddClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {/* Search */}
      <div className="flex items-center flex-1 h-[40px] border border-gray-500 rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2">
        <Search size={20} className="text-black flex-shrink-0" />
        <input
          type="text"
          placeholder="Cari Mata Pelajaran"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full outline-none text-[14px] bg-transparent placeholder:text-black"
        />
      </div>

      {/* Button */}
      <button
        onClick={onAddClick}
        className="flex items-center justify-center bg-[#3B82F6] text-white px-4 rounded-[12px]
               w-full sm:w-auto h-[44px] shadow hover:bg-blue-700 gap-1"
      >
        <Plus size={15} />
        <span className="text-sm font-medium">Tambah Maple</span>
      </button>
    </div>
  );
}
