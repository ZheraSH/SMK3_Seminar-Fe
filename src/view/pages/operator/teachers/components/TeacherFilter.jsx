import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from "react";

export const TeacherFilter = ({
  category,
  religions,
  onCategorySelect,
  openCategory,
  setOpenCategory,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState("");
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setOpenCategory(false);
        setOpenSubMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenCategory]);

  return (
    <div ref={categoryRef} className="relative">
      <button
        onClick={() => {
          setOpenCategory(!openCategory);
          setOpenSubMenu("");
        }}
        className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:bg-gray-50 transition text-sm font-medium min-w-[170px] justify-between"
      >
        {category}
        <ChevronDown size={16} />
      </button>

      {openCategory && (
        <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg p-2 z-50 min-w-[200px]">
          <button
            onClick={() => onCategorySelect("Semua Kategori")}
            className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-blue-50 rounded-lg text-gray-700 font-medium transition"
          >
            Tampilkan Semua
            {(category === "Semua Kategori" || category === "Pilih Kategori") && (
              <span>✓</span>
            )}
          </button>

          {/* Gender */}
          <button
            onClick={() =>
              setOpenSubMenu(openSubMenu === "gender" ? "" : "gender")
            }
            className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
          >
            Jenis Kelamin
            <ChevronRight size={16} />
          </button>

          {openSubMenu === "gender" && (
            <div className="ml-4 mt-1">
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

          {/* Religion */}
          <button
            onClick={() =>
              setOpenSubMenu(openSubMenu === "religion" ? "" : "religion")
            }
            className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
          >
            Agama
            <ChevronRight size={16} />
          </button>

          {openSubMenu === "religion" && (
            <div className="ml-4 mt-1">
              {religions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onCategorySelect(`religion: ${r.name}`)}
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
      )}
    </div>
  );
};
