import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const FilterDropdown = ({
  category,
  openCategory,
  setOpenCategory,
  openSubMenu,
  setOpenSubMenu,
  religions,
  categoryRef,
  handleCategorySelect,
}) => {
  return (
    <div className="relative" ref={categoryRef}>
      <button
        onClick={() => {
          setOpenCategory(!openCategory);
          setOpenSubMenu("");
        }}
        className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:bg-gray-50 transition text-sm font-medium min-w-[170px] justify-between"
      >
        <span className="text-black">{category}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            openCategory ? "rotate-180" : ""
          }`}
        />
      </button>

      {openCategory && (
        <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-20">
          <button
            onClick={() => handleCategorySelect("Semua Kategori")}
            className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-blue-50 rounded-lg text-gray-700 font-medium transition"
          >
            Tampilkan Semua
            {(category === "Semua Kategori" || category === "Pilih Kategori") && (
              <span className="text-blue-600 font-bold">✓</span>
            )}
          </button>

          <div className="border-t border-gray-100">
            <button
              onClick={() =>
                setOpenSubMenu(openSubMenu === "gender" ? "" : "gender")
              }
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
                    onClick={() => handleCategorySelect(`Gender: ${g}`)}
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

          <div className="border-t border-gray-100">
            <button
              onClick={() =>
                setOpenSubMenu(openSubMenu === "religion" ? "" : "religion")
              }
              className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
            >
              Agama
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  openSubMenu === "religion" ? "rotate-90" : ""
                }`}
              />
            </button>
            {openSubMenu === "religion" && (
              <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-40 overflow-y-auto">
                {religions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleCategorySelect(`religion: ${r.name}`)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                      category === `religion: ${r.name}`
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
