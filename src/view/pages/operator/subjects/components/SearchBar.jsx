"use client";

import LoadingData from "../../../../components/elements/loadingData/loading";
import { Search, Plus } from "lucide-react";

export function SearchBar({ search, onSearchChange, onAddClick,loading }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      {loading ? 
        ( <LoadingData loading={loading} type="create" /> )
        : 
        (
          <>
            <div className="flex items-center h-[40px] w-[320px] border border-[#CBD5E1] rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2">
              <Search size={20} className="text-black flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari Mata Pelajaran"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full outline-none text-[14px] bg-transparent placeholder:text-[#9CA3AF]"
              />
            </div>
            <button
              onClick={onAddClick}
              className="flex items-center justify-center bg-[#3B82F6] text-white px-3 md:px-4 rounded-full md:rounded-[12px] h-[44px] shadow hover:bg-blue-700 gap-1"
            >
              <Plus className=" w-[20px] h-[20px] font-medium" />
              <span className="text-sm font-medium hidden  md:block">Tambah Mapel</span>
            </button>
          </>
        )}
    </div>
  );
}
