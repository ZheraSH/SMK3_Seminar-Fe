"use client"

import { Search, Plus } from "lucide-react"

export function SearchBar({ search, onSearchChange, onAddClick }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center w-[322px] h-[40px] sm:w-[320px] border border-gray-500 rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2 flex-shrink-0">
        <Search size={20} className="text-black flex-shrink-0" />
        <input
          type="text"
          placeholder="Cari Mata Pelajaran"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full outline-none text-[14px] bg-transparent placeholder:text-black"
        />
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center bg-[#3B82F6] text-white px-4 rounded-[12px] w-[155px] h-[44px] shadow hover:bg-blue-700"
      >
        <Plus size={15} /> <p className="text-[14px] font-medium">Tambah Maple</p>
      </button>
    </div>
  )
}
