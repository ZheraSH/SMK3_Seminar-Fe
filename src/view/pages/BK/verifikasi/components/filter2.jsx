import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Pill, UserX, GraduationCap, LayoutGrid } from 'lucide-react';

const Filter2 = ({ onTypeSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Semua Tipe');
  const dropdownRef = useRef(null);

  const options = [
    { id: 'all', label: 'Semua Tipe' },
    { id: 'sakit', label: 'Sakit' },
    { id: 'alpha', label: 'Alpha'},
    { id: 'izin', label: 'Izin'},
    { id: 'dispensasi', label: 'Dispensasi' },
  ];

  // Menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedType(option.label);
    setIsOpen(false);
    if (onTypeSelect) onTypeSelect(option.id);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-between w-full lg:w-[180px] md:w-[160px] h-[40px] px-4 py-2 text-sm  text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none">
          <span className="truncate">{selectedType}</span>
          <ChevronRight size={18} className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg  focus:outline-none overflow-hidden animate-in fade-in zoom-in duration-100">
          <div className="py-1">
            {options.map((option) => (
              <button key={option.id} onClick={() => handleSelect(option)} className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150">
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter2;