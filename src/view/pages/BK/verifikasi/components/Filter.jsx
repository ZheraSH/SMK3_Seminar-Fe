import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight,Check } from 'lucide-react';

function Filter({ classOptions, selectedClassId, handleClassSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(null); 
    const dropdownRef = useRef(null);

    const findSelectedLabel = (options, value) => {
        if (value === "") return 'Semua Kelas';

        for (const option of options) {
            if (option.value === value) return option.label;
            
            if (option.children) {
                const child = option.children.find(c => c.value === value);
                if (child) return child.label;
            }
        }
        return 'Kelas';
    };

    const selectedLabel = findSelectedLabel(classOptions, selectedClassId); 

    const closeDropdown = () => {
        setIsOpen(false);
        setSubMenuOpen(null); 
    };

    const handleItemClick = (value, isMajor) => { 
        handleClassSelect(value);
        closeDropdown();
    };
    
    const toggleSubMenu = (majorValue) => {
        setSubMenuOpen(subMenuOpen === majorValue ? null : majorValue);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const isPlaceholderChildren = subMenuOpen && 
        classOptions.find(opt => opt.value === subMenuOpen)?.children.length === 1 &&
        classOptions.find(opt => opt.value === subMenuOpen)?.children[0].isPlaceholder;

    return (
        <div className="relative w-full sm:w-[150px]" ref={dropdownRef}>
            <button type="button" className="w-full h-10 py-2 px-4 flex items-center justify-between rounded-full bg-white shadow-sm border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 " onClick={() => setIsOpen(!isOpen)}>
                <span className="truncate">{selectedLabel}</span>
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? 'transform rotate-90 text-blue-500' : 'text-gray-500'}`} />
            </button>

            {isOpen && (
                <div className="absolute z-30 mt-3 lg:left-0 md:left-0 left-3 right-0 w-56 rounded-md bg-white drop-shadow-xl focus:outline-none" style={{ maxHeight: '300px', overflowY: 'auto', minWidth: '200px' }}>
                    {classOptions.map((option) => {
                        return (
                            <React.Fragment key={option.value}>
                                <div className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer ${option.children && 'font-medium'}`}
                                    onClick={() => {
                                        if (!option.children) {
                                            handleItemClick(option.value, option.isMajor);
                                        } else {
                                            toggleSubMenu(option.value);
                                        }
                                    }}>
                                    <span className='flex items-center gap-2'> {option.label}</span>
                                    
                                    {option.children && (
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${subMenuOpen === option.value ? 'transform rotate-90 text-blue-500' : 'text-gray-500'}`} />
                                    )}
                                </div>
                                
                                {option.children && subMenuOpen === option.value && (
                                    <div className="pl-4 bg-gray-50/50">
                                        {isPlaceholderChildren ? (
                                            <div className="block px-4 py-2 text-sm text-gray-500 italic">
                                                Kelas belum ada
                                            </div>
                                        ) : (
                                            option.children.map((child) => {
                                                const isLevel2Selected = selectedClassId === child.value;
                                                return (
                                                    <div key={child.value} className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer rounded-lg 
                                                        ${isLevel2Selected ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`} 
                                                        onClick={() => handleItemClick(child.value, child.isMajor)}>
                                                        <span className='flex items-center gap-2'>
                                                            {child.label}
                                                            {isLevel2Selected && <Check className="w-4 h-4" />} 
                                                        </span>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default Filter;