import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const DropdownFilter = ({ onSelect, currentStatus }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

  const options = [
    { label: "Semua Status", value: "" },
    { label: "Hadir", value: "hadir" },
    { label: "Terlambat", value: "terlambat" },
    { label: "Alpha", value: "alpha" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === currentStatus)?.label || "Pilih Status";

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center justify-between w-full md:w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none transition-all">
        <span>{selectedLabel}</span>
        <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg animate-in fade-in zoom-in duration-200">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${
                  currentStatus === option.value ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
