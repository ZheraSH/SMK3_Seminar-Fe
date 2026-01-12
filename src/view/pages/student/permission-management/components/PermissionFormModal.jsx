"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronRight } from "lucide-react"; 

const dropdownOptions = [
  { value: "sick", label: "Sakit" },
  { value: "permission", label: "Izin" },
  { value: "dispensation", label: "Dispensasi" },
];

const CustomDropdown = ({ value, onChange, disabled, placeholder = "-- Pilih Jenis Izin --", options, error,}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button type="button" onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        disabled={disabled}
        className={` w-full border rounded-lg px-4 py-2 text-left transition duration-150 ${error ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-300 bg-gray-100 text-gray-900'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600'} flex justify-between items-center`}>
        <span>{displayLabel}</span>
        <ChevronRight size={18} className={`transform transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
          <div onClick={() => handleSelect("")} className={`px-4 py-2 cursor-pointer transition duration-100${value === "" ? "bg-gray-200 text-gray-500 font-medium" : "hover:bg-gray-100 text-gray-500"}`}>
            {placeholder}
          </div>
          
          {options.map((option) => (
            <div key={option.value} onClick={() => handleSelect(option.value)} className={` px-4 py-2 cursor-pointer transition duration-100 ${option.value === value ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100 text-gray-800"}`}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const PermissionFormModal = ({ isOpen, onClose, formData, onFormChange, onSubmit, errors, isSubmitting = false,}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
       <style jsx global>{`
        .scrollbarHidden {
          scrollbar-width: none; 
        }

        .scrollbarHidden::-webkit-scrollbar {
            display: none; 
        }
      `}</style>
      <div className="bg-white rounded-lg p-6 h-[604px] max-w-md w-full overflow-y-auto scrollbarHidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-semibold text-gray-900">Buat Izin Baru</h2>
          <button onClick={onClose} disabled={isSubmitting} className="text-gray-500 hover:text-gray-700 transition disabled:opacity-50">
            <X size={24} />
          </button>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {errors.general[0]}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2"> Jenis Izin </label>
            <CustomDropdown value={formData.type} onChange={(newValue) => onFormChange({ ...formData, type: newValue })} disabled={isSubmitting} options={dropdownOptions}  error={errors.type}/>
            {errors.type && (
              <p className="text-red-600 text-sm mt-1">{errors.type[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2"> Tanggal Mulai</label>
            <input type="date"  value={formData.start_date} onChange={(e) => onFormChange({ ...formData, start_date: e.target.value })} disabled={isSubmitting} className="w-full h-[40px] border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"/>
            {errors.start_date && (
              <p className="text-red-600 text-sm mt-1">
                {errors.start_date[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2"> Tanggal Selesai </label>
            <input type="date"  value={formData.end_date} onChange={(e) => onFormChange({ ...formData, end_date: e.target.value }) } disabled={isSubmitting} className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"/>
            {errors.end_date && (
              <p className="text-red-600 text-sm mt-1">{errors.end_date[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2"> Bukti </label>
            <div className="relative w-full border border-gray-300 bg-gray-100 rounded-lg p-2 flex items-center">
                <input type="file" id="proof-upload" onChange={(e) => onFormChange({ ...formData, proof: e.target.files[0] })} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                <label  htmlFor="proof-upload" className={`py-1 px-4 rounded-md text-[14px] cursor-pointer shadow-md transition duration-200 text-white ${formData.proof  ? "bg-gray-400 hover:bg-gray-500" : "bg-blue-600 hover:bg-blue-700" }`} >
                    Choose File
                </label>
                <span className="ml-3 text-gray-700 truncate">
                    {formData.proof ? formData.proof.name : 'Belum ada file dipilih'}
                </span>
            </div>
            {errors.proof && (
            <p className="text-red-600 text-sm mt-1">{errors.proof[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2"> Alasan </label>
            <textarea value={formData.reason} onChange={(e) => onFormChange({ ...formData, reason: e.target.value }) } placeholder="Tulis alasan " disabled={isSubmitting} className="w-full border h-[80px] border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none disabled:opacity-50" rows={4}/>
            {errors.reason && (
              <p className="text-red-600 text-sm mt-1">{errors.reason[0]}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className="w-[95px] text-[14px] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </>
            ) : (
              "Kirim Izin"
            )}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};