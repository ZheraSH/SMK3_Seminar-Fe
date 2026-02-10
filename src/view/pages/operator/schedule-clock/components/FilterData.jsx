import React, { useState } from "react";
import { Check, ChevronRight } from "lucide-react";

export default function FilterDropdown({ filters, options, onChange }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "major",
      label: "Jurusan",
      items: Array.isArray(options?.majors)
        ? options.majors.map((m) => ({
            label: m.code,    
            value: m.code,
          }))
        : [],
    },
    {
      id: "level_class",
      label: "Tingkatan",
      items: Array.isArray(options?.levelClasses)
        ? options.levelClasses.map((l) => ({
            label: l.name,   
            value: l.name,   
          }))
        : [],
    },
    {
      id: "school_year",
      label: "Tahun Ajaran",
      items: Array.isArray(options?.schoolYears)
        ? options.schoolYears.map((y) => ({
            label: y.name,
            value: y.name,
          }))
        : [],
    },
  ];

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const handleSelectExclusive = (key, value) => {
    const newFilters = {
      major: "",
      level_class: "",
      school_year: "",
      [key]: value,
    };

    onChange(newFilters);
    setOpen(false);
    setOpenSection(null);
  };

  const isSelected = (key, value) => filters[key] === value;

  const getFilterLabel = () => {
    for (let sec of sections) {
      const activeItem = sec.items.find(
        (item) => filters[sec.id] === item.value
      );
      if (activeItem) return activeItem.label;
    }
    return "Show all";
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center w-auto max-w-[110px] md:max-w-full px-4 py-2 bg-white rounded-full border border-gray-300 shadow-sm text-gray-700 overflow-hidden">
        <span className="lg:text-sm md:text-sm text-[12px] truncate mr-1">
          {getFilterLabel()}
        </span>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}/>
      </button>

      {open && (
        <div className="absolute mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
          <span className="mb-2 font-semibold text-sm">Pilih Kategori</span>
          <button onClick={() => { onChange({ major: "", level_class: "", school_year: "" }); setOpen(false); setOpenSection(null); }}
            className="w-full text-left px-1 flex justify-between items-center mt-3 rounded-md">
            <span className="text-gray-800 text-[14px] mt-2">Show all</span>
            {!filters.major &&
              !filters.level_class &&
              !filters.school_year && (
                <Check size={16} className="text-blue-400 mt-2" />
              )}
          </button>

          {sections.map((sec) => (
            <div key={sec.id} className="mt-4">
              <button onClick={() => toggleSection(sec.id)} className="w-full flex justify-between items-center text-left text-gray-800 font-semibold py-1">
                <span className="text-sm">{sec.label}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${ openSection === sec.id ? "rotate-90" : "" }`} />
              </button>

              {openSection === sec.id && (
                <div className="mt-1 ml-3 space-y-1">
                  {sec.items.map((item) => (
                    <button key={item.value} onClick={() => handleSelectExclusive(sec.id, item.value)} className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded-md flex justify-between items-center">
                      <span className="text-sm">{item.label}</span>
                      {isSelected(sec.id, item.value) && (
                        <Check size={16} className="text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
