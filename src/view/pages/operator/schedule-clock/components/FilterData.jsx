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
        ? options.majors.map((m) => m.name)
        : [],
    },
    {
      id: "level_class",
      label: "Tingkatan",
      items: Array.isArray(options?.levelClasses)
        ? options.levelClasses.map((l) => l.name)
        : [],
    },
    {
      id: "school_year",
      label: "Tahun Ajaran",
      items: Array.isArray(options?.schoolYears?.data)
        ? options.schoolYears.data.map((y) => y.name)
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
      ...(key && { [key]: value }),
    };

    onChange(newFilters);
    setOpen(false);
    setOpenSection(null);
  };

  const isSelected = (key, value) => filters[key] === value;

  const getFilterLabel = () => {
    if (filters.major) return filters.major;
    if (filters.level_class) return filters.level_class;
    if (filters.school_year) return filters.school_year;
    return "Show all";
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center w-auto max-w-[110px] md:max-w-full px-4 py-2 bg-white rounded-full border border-gray-300 shadow-sm text-gray-700 overflow-hidden" >
        <span className="lg:text-sm md:text-sm text-[12px] truncate mr-1 md:whitespace-nowrap md:truncate-none"> 
          {getFilterLabel()}
        </span>
        <ChevronRight className={`w-4 h-4 ml-auto flex-shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}/> 
      </button>

      {open && (
        <div className="absolute mt-2 right-0 w-64 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
          <span className="mb-2 font-semibold text-sm">Pilih Kategori</span>
            <button onClick={() => { onChange({ major: "", level_class: "", school_year: "" }); setOpen(false);setOpenSection(null);  }} className="w-full text-left px-1 flex justify-between items-center  mt-3 rounded-md">
              <span className="text-gray-800 text-[14px] mt-2">Show all</span>
              {(!filters.major && !filters.level_class && !filters.school_year) && (
                <Check size={16} className="text-blue-400 mt-2" />
              )}
            </button>

            {sections.map((sec) => (
              <div key={sec.id} className="mt-4">
                <button onClick={() => toggleSection(sec.id)} className="w-full flex justify-between items-center text-left text-gray-800 font-semibold py-1">
                  <span className="text-sm">{sec.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${openSection === sec.id ? "rotate-90" : ""}`}/>
                </button>

                {openSection === sec.id && (
                  <div className="mt-1 ml-3 space-y-1">
                    {sec.items.map((item) => (
                      <button key={item} onClick={() => handleSelectExclusive(sec.id, item)} className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded-md flex justify-between items-start">
                        <span className="text-sm break-words pr-2">{item}</span>
                        {isSelected(sec.id, item) && (
                          <Check size={16} className="text-blue-400 flex-shrink-0" />
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
