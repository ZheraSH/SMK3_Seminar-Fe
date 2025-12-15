"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export const StudentFilterDropdown = ({ category, setCategory, masters }) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const dropdownRef = useRef(null);

  const optionMap = {
    gender: masters.genders || [],
    major: masters.majors || [],
    level_class: masters.levelClasses || [],
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenCategory(false);
        setOpenSubMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetFilter = () => {
    setCategory({ type: "", value: "", label: "Pilih Kategori" });
    setOpenCategory(false);
    setOpenSubMenu("");
  };

  return (
    <div className="relative w-full sm:w-auto flex" ref={dropdownRef}>
      <div className="flex gap-2 items-center w-full">
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:bg-gray-50 transition text-sm font-medium w-full sm:w-[200px] justify-between"
        >
          <span className="text-black truncate">{category.label}</span>
          <ChevronRight
            className={`w-4 h-4 text-gray-500 transition-transform ${
              openCategory ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Dropdown menu */}
      {openCategory && (
        <div className="absolute top-full mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-20 max-h-72 overflow-y-auto">
          <div className="border-b border-gray-100">
            <button
              onClick={handleResetFilter}
              className="w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-md text-gray-700 font-medium transition"
            >
              Tampilkan Semua
            </button>
          </div>

          {/* Gender */}
          <DropdownSection
            title="Jenis Kelamin"
            options={optionMap.gender}
            category={category}
            setCategory={setCategory}
            openSubMenu={openSubMenu}
            setOpenSubMenu={setOpenSubMenu}
            keyName="gender"
          />

          {/* Major */}
          <DropdownSection
            title="Jurusan"
            options={optionMap.major}
            category={category}
            setCategory={setCategory}
            openSubMenu={openSubMenu}
            setOpenSubMenu={setOpenSubMenu}
            keyName="major"
          />

          {/* Level Class */}
          <DropdownSection
            title="Tingkatan"
            options={optionMap.level_class}
            category={category}
            setCategory={setCategory}
            openSubMenu={openSubMenu}
            setOpenSubMenu={setOpenSubMenu}
            keyName="level_class"
          />
        </div>
      )}
    </div>
  );
};

const DropdownSection = ({
  title,
  options,
  category,
  setCategory,
  openSubMenu,
  setOpenSubMenu,
  keyName,
}) => {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() =>
          setOpenSubMenu(openSubMenu === keyName ? "" : keyName)
        }
        className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
      >
        {title}
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform ${
            openSubMenu === keyName ? "rotate-90" : ""
          }`}
        />
      </button>

      {openSubMenu === keyName && (
        <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setCategory({ type: keyName, value: opt.value, label: opt.label });
                setOpenSubMenu("");
              }}
              className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                category.type === keyName && category.value === opt.value
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
