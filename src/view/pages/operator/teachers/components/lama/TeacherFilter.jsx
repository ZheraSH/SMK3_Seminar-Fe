"use client"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"

export default function TeacherFilter({
  query,
  setQuery,
  category,
  setCategory,
  openCategory,
  setOpenCategory,
  openSubMenu,
  setOpenSubMenu,
  setPage,
}) {
  const categoryRef = useRef(null)

  function handleCategorySelect(newCategory) {
    setCategory(newCategory)
    setOpenCategory(false)
    setOpenSubMenu("")
    setPage(1)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setOpenCategory(false)
        setOpenSubMenu("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search Input */}
      <div className="flex items-center bg-white border rounded-full shadow-sm px-4 py-1.5 w-[190px] transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
          className="ml-3 outline-none text-sm w-full placeholder-gray-500"
          placeholder="Cari nama, NIP, role..."
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative" ref={categoryRef}>
        <button
          onClick={() => {
            setOpenCategory(!openCategory)
            setOpenSubMenu("")
          }}
          className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium min-w-[150px] justify-between"
        >
          <span className={`${category === "Pilih Kategori" ? "text-gray-500" : "text-gray-700"}`}>
            {category}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openCategory ? "rotate-180" : ""
            }`} 
          />
        </button>

        {/* Dropdown Menu */}
        {openCategory && (
          <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-20 origin-top-left animate-in fade-in-0 zoom-in-95">
            {/* All Categories */}
            <button
              onClick={() => handleCategorySelect("Semua Kategori")}
              className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-blue-50 rounded-lg text-gray-700 font-medium transition-colors"
            >
              Tampilkan Semua
              {(category === "Semua Kategori" || category === "Pilih Kategori") && (
                <span className="text-blue-600 font-bold">✓</span>
              )}
            </button>

            {/* Role Submenu */}
            <div className="border-t border-gray-100 first:border-t-0">
              <button
                onClick={() => setOpenSubMenu(openSubMenu === "role" ? "" : "role")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors"
              >
                Role
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openSubMenu === "role" ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openSubMenu === "role" && (
                <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                  {["Pengajar", "BK", "Waka Kurikulum", "Wali Kelas"].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleCategorySelect(`Role: ${r}`)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                        category === `Role: ${r}`
                          ? "bg-blue-100 text-blue-700 font-semibold border border-blue-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Submenu */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => setOpenSubMenu(openSubMenu === "gender" ? "" : "gender")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors"
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
                  {["Laki - laki", "Perempuan"].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleCategorySelect(`Gender: ${g}`)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                        category === `Gender: ${g}`
                          ? "bg-blue-100 text-blue-700 font-semibold border border-blue-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mapel Submenu */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => setOpenSubMenu(openSubMenu === "mapel" ? "" : "mapel")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors"
              >
                Mata Pelajaran
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openSubMenu === "mapel" ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openSubMenu === "mapel" && (
                <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-40 overflow-y-auto">
                  {[
                    "Matematika",
                    "Bahasa Indonesia",
                    "IPA",
                    "IPS",
                    "Fisika",
                    "Kimia",
                    "Biologi",
                    "Sejarah",
                    "Geografi",
                  ].map((m) => (
                    <button
                      key={m}
                      onClick={() => handleCategorySelect(`Mapel: ${m}`)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                        category === `Mapel: ${m}`
                          ? "bg-blue-100 text-blue-700 font-semibold border border-blue-200"
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
    </div>
  )
}