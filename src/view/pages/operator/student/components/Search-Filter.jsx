"use client"

import { Search, ChevronDown, ChevronRight } from "lucide-react"
import { useRef, useEffect } from "react"

export function SearchFilter({
  searchTerm,
  onSearchChange,
  category,
  openCategory,
  onOpenCategory,
  openSubMenu,
  onOpenSubMenu,
  onCategorySelect,
  onAddData
}) {
  const categoryRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        onOpenCategory(false)
        onOpenSubMenu("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onOpenCategory, onOpenSubMenu])

  return (
    <div className="flex flex-wrap gap-3 mb-5 items-center justify-between md:justify-start">
      {/* Search Input */}
      <div className="flex items-center w-full sm:w-[300px] md:w-[320px] border rounded-full px-3 py-1.5 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-1">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari nama / NIS / Kelas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full outline-none text-sm bg-transparent placeholder:text-gray-500"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative w-full sm:w-auto" ref={categoryRef}>
        <button
          onClick={() => {
            onOpenCategory(!openCategory)
            onOpenSubMenu("")
          }}
          className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:bg-gray-50 transition text-sm font-medium w-full sm:w-[180px] justify-between"
        >
          <span className="text-black truncate">{category}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openCategory ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {openCategory && (
          <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-20">
            <button
              onClick={() => onCategorySelect("Semua Kategori")}
              className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-blue-50 rounded-lg text-gray-700 font-medium transition"
            >
              Tampilkan Semua
              {(category === "Semua Kategori" || category === "Pilih Kategori") && (
                <span className="text-blue-600 font-bold">✓</span>
              )}
            </button>

            {/* Gender */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => onOpenSubMenu(openSubMenu === "gender" ? "" : "gender")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
              >
                Jenis Kelamin
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openSubMenu === "gender" ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openSubMenu === "gender" && (
                <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                  {["Laki-laki", "Perempuan"].map((g) => (
                    <button
                      key={g}
                      onClick={() => onCategorySelect(`Gender: ${g}`)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                        category === `Gender: ${g}`
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* majors */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => onOpenSubMenu(openSubMenu === "majors" ? "" : "majors")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
              >
                Jurusan
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openSubMenu === "majors" ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openSubMenu === "majors" && (
                <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                  {["PPLG", "DKV"].map((r) => (
                    <button
                      key={r}
                      onClick={() => onCategorySelect(`majors: ${r}`)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                        category === `majors: ${r}`
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* levelclasses */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => onOpenSubMenu(openSubMenu === "levelclasses" ? "" : "levelclasses")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
              >
                Tingkatan
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openSubMenu === "levelclasses" ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openSubMenu === "levelclasses" && (
                <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-40 overflow-y-auto">
                  {["XII", "XI", "X"].map((m) => (
                    <button
                      key={m}
                      onClick={() => onCategorySelect(`levelclasses: ${m}`)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                        category === `levelclasses: ${m}`
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1"></div>

      {/* Tombol Tambah Data */}
      {onAddData && (
        <button
          onClick={onAddData}
          className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-1"
        >
          <span>+</span>
          <span>Tambah Data</span>
        </button>
      )}
    </div>
  )
}
