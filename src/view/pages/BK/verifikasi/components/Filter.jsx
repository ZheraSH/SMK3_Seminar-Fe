 import { useState } from "react";
import {  ChevronRight } from 'lucide-react';

 
 
 export const CustomDropdown = ({ placeholder, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
      setSelected(option);
      setIsOpen(false);
      if (onSelect) onSelect(option);
    };

    const currentLabel = selected || placeholder;

  return (
    <div className="relative z-20 w-[207px]">
            <button
                type="button"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg bg-white text-left shadow-sm flex items-center justify-between transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={`text-sm ${selected ? 'text-gray-900' : 'text-gray-500'}`}>
                    {currentLabel}
                </span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-full rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
  );
};