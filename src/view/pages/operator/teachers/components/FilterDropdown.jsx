"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export const TeacherFilterDropdown = ({ category, setCategory, masters }) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const dropdownRef = useRef(null);

  const optionMap = {
    gender: masters.genders || [],
    subjects: masters.subjects || [],
    role: masters.roles || [],
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
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
    setOpenCategory(false);
    setOpenSubMenu("");
  };

  return (
    <div
      className="relative flex flex-wrap gap-3 items-center"
      ref={dropdownRef}
    >
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

      {openCategory && (
        <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-20">
          {/* Tombol Tampilkan Semua */}
          <div className="border-b border-gray-100">
            <button
              onClick={handleResetFilter}
              className="w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-md text-gray-700 font-medium transition"
            >
              Tampilkan Semua
            </button>
          </div>

          {/* Gender */}
          <div className="border-b border-gray-100">
            <button
              onClick={() =>
                setOpenSubMenu(openSubMenu === "gender" ? "" : "gender")
              }
              className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
            >
              Jenis Kelamin
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  openSubMenu === "gender" ? "rotate-90" : ""
                }`}
              />
            </button>
            {openSubMenu === "gender" && (
              <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                {optionMap.gender.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => {
                      setCategory({
                        type: "gender",
                        value: g.value,
                        label: g.label,
                      });
                      setOpenCategory(false);
                      setOpenSubMenu("");
                    }}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                      category.type === "gender" && category.value === g.value
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role */}
          <div className="border-b border-gray-100">
            <button
              onClick={() =>
                setOpenSubMenu(openSubMenu === "role" ? "" : "role")
              }
              className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
            >
              Role
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  openSubMenu === "role" ? "rotate-90" : ""
                }`}
              />
            </button>
            {openSubMenu === "role" && (
              <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                {optionMap.role.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => {
                      setCategory({
                        type: "role",
                        value: r.value,
                        label: r.label,
                      });
                      setOpenCategory(false);
                      setOpenSubMenu("");
                    }}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                      category.type === "role" && category.value === r.value
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subjects */}
          <div className="border-b border-gray-100">
            <button
              onClick={() =>
                setOpenSubMenu(openSubMenu === "subjects" ? "" : "subjects")
              }
              className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
            >
              Mata Pelajaran
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  openSubMenu === "subjects" ? "rotate-90" : ""
                }`}
              />
            </button>
            {openSubMenu === "subjects" && (
              <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-48 overflow-y-auto">
                {optionMap.subjects.map((subject) => (
                  <button
                    key={subject.value}
                    onClick={() => {
                      setCategory({
                        type: "subjects",
                        value: subject.value,
                        label: subject.label,
                      });
                      setOpenCategory(false);
                      setOpenSubMenu("");
                    }}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                      category.type === "subjects" &&
                      category.value === subject.value
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {subject.label}
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
