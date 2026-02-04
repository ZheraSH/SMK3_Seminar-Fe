"use client";

import React, { useState } from "react";
import { Check, ChevronRight, ChevronDown } from "lucide-react";

const CheckIcon = () => <Check className="h-4 w-4 text-blue-600" />;
const ChevronRightIcon = () => <ChevronRight className="w-4 h-4 text-gray-500" />;
const ChevronDownIcon = () => <ChevronDown className="w-4 h-4 text-gray-500" />;
const ChevronIcon = () => <ChevronRight className="w-4 h-4 text-gray-500" />;

const FilterDropdown = ({ filters, filterOptions, handleFilterChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openCategoryKey, setOpenCategoryKey] = useState(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleCategory = (key) => setOpenCategoryKey((prev) => (prev === key ? null : key));

  const getItemLabel = (item) => (typeof item === "string" ? item : item.label);
  const getItemValue = (item) => (typeof item === "string" ? item : item.value);

  const getActiveFilterValue = () => {
    if (filters.major) {
      const found = filterOptions.majors.find((m) => m.name === filters.major);
      return found?.code || "All";
    }
    if (filters.level_class) return filters.level_class;
    if (filters.school_year) return filters.school_year;
    return "Show all";
  };

  const handleFilterSelect = (value) => {
    let newFilters = { major: "", school_year: "", level_class: "" };

    if (value === "Show all" || value === "Semua") {
      newFilters = { major: "", school_year: "", level_class: "" };
    } else if (filterOptions.levelClasses.some((l) => l.name === value)) {
      newFilters.level_class = value;
    } else if (value.value && filterOptions.majors.some((m) => m.name === value.value)) {
      newFilters.major = value.value;
    } else if (filterOptions.schoolYears.some((y) => y.name === value)) {
      newFilters.school_year = value;
    }

    handleFilterChange(newFilters);
    setOpenCategoryKey(null);
    setIsDropdownOpen(false);
  };

  const filterMenuOptions = [
    {
      type: "item",
      label: "Semua",
      display: "Show all",
    },
    {
      type: "category",
      key: "major",
      label: "Jurusan",
      items: filterOptions.majors.map((m) => ({ label: m.code, value: m.name })),
    },
    {
      type: "category",
      key: "level",
      label: "Tingkat Kelas",
      items: filterOptions.levelClasses.map((l) => l.name),
    },
    {
      type: "category",
      key: "year",
      label: "Tahun Ajaran",
      items: filterOptions.schoolYears.length > 0 
        ? filterOptions.schoolYears.map((y) => y.name) 
        : ["Data Tahun Ajaran Tidak Tersedia"],
    },
  ];

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center h-[40px] space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
        <span className="text-sm font-medium">{getActiveFilterValue()}</span>
        <span className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-90" : "rotate-0"}`}>
          <ChevronIcon />
        </span>
      </button>

      {isDropdownOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
          <div className="absolute z-20 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl right-0 md:left-0 p-1 overflow-hidden">
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Pilih Kategori</div>
              {filterMenuOptions.map((option, index) => {
                if (option.type === "item") {
                  return (
                    <button key={index} onClick={() => handleFilterSelect(option.display)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex justify-between items-center rounded-lg transition">
                      {option.display}  {getActiveFilterValue() === option.display && <CheckIcon />}
                  </button>
                );
              }

              if (option.type === "category") {
                const isOpen = openCategoryKey === option.key;
                const isYearEmpty = option.key === "year" && option.items[0] === "Data Tahun Ajaran Tidak Tersedia";

                return (
                  <div key={index} className="mt-1">
                    <button onClick={() => toggleCategory(option.key)} className={`w-full text-left px-3 py-2 text-sm font-semibold flex justify-between items-center rounded-lg transition ${isOpen ? "bg-gray-50 text-gray-800" : "text-gray-800 hover:bg-gray-50"}`}>
                      {option.label}  {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </button>
                    {isOpen && (
                      <div className="bg-gray-50/50 mt-1 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                        {isYearEmpty ? (
                          <div className="w-full text-left pl-7 pr-3 py-2 text-xs text-red-400 italic">
                            {option.items[0]}
                          </div>
                        ) : (
                          option.items.map((item, itemIndex) => {
                            const val = getItemValue(item);
                            const isActive = (option.key === "major" && filters.major === val) ||
                                           (option.key === "level" && filters.level_class === val) ||
                                           (option.key === "year" && filters.school_year === val);
                            
                            return (
                              <button key={itemIndex} onClick={() => handleFilterSelect(item)} className={`w-full text-left pl-7 pr-3 py-2 text-sm flex justify-between items-center transition ${isActive ? "text-gray-600 font-medium" : "text-gray-600 hover:bg-blue-50"}`}>
                                {getItemLabel(item)} {isActive && <CheckIcon />}
                              </button>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;