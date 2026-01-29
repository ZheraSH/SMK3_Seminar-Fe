import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

function Filter({ classOptions, selectedClassId, handleClassSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedLabel = classOptions.find(opt => opt.value === selectedClassId)?.label || 'Pilih Kelas';

    return (
        <div className="relative w-full sm:w-[180px]" ref={dropdownRef}>
            <button  onClick={() => setIsOpen(!isOpen)} className="w-full h-10 px-4 flex items-center justify-between rounded-full bg-white border border-gray-300 text-sm shadow-sm">
                <span className="truncate">{selectedLabel}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 max-h-60 overflow-y-auto">
                    {classOptions.map((option) => (
                        <div key={option.value} className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${selectedClassId === option.value ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                            onClick={() => { handleClassSelect(option.value); setIsOpen(false);}}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Filter;