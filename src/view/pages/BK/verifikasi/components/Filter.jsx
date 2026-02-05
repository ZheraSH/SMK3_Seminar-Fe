import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Filter as FilterIcon, Check, GraduationCap, LayoutGrid, Activity } from 'lucide-react';

const UnifiedFilter = ({  classOptions = [],  selectedClassId,  handleClassSelect, selectedType,  onTypeSelect, selectedStatus, onStatusSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null); 
    const dropdownRef = useRef(null);

    const typeOptions = [
        { id: 'all', label: 'Semua Tipe' },
        { id: 'sick', label: 'Sakit' },
        { id: 'permission', label: 'Izin' },
        { id: 'dispensation', label: 'Dispensasi' },
    ];

    const statusOptions = [
        { id: 'all', label: 'Semua Status' },
        { id: 'pending', label: 'Menunggu' },
        { id: 'approved', label: 'Disetujui' },
        { id: 'rejected', label: 'Ditolak' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setActiveAccordion(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleAccordion = (tab) => {
        setActiveAccordion(activeAccordion === tab ? null : tab);
    };

    return (
        <div className="relative inline-block text-left w-full" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center justify-between w-full lg:w-[200px] h-10 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-all"
            >
                <div className="flex items-center gap-2">
                    <FilterIcon size={16} className="text-gray-400" />
                    <span>Filter</span>
                </div>
                <ChevronRight size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 lg:left-0 z-50 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col p-2 gap-1">
                        <div className="flex flex-col">
                            <button  onClick={() => toggleAccordion('class')}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${activeAccordion === 'class' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-2"><GraduationCap size={16}/> Kelas</div>
                                <ChevronRight size={14} className={`transition-transform duration-200 ${activeAccordion === 'class' ? 'rotate-90' : ''}`} />
                            </button>
                            {activeAccordion === 'class' && (
                                <div className="flex flex-col mt-1 mb-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg animate-in slide-in-from-top-2">
                                    {classOptions.map((opt) => (
                                        <div key={opt.value} onClick={() => { handleClassSelect(opt.value); setIsOpen(false); }}
                                            className="flex items-center justify-between px-10 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                            {opt.label} {selectedClassId === opt.value && <Check size={14} className="text-blue-500" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <button  onClick={() => toggleAccordion('type')}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${activeAccordion === 'type' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-2"><LayoutGrid size={16}/> Tipe</div>
                                <ChevronRight size={14} className={`transition-transform duration-200 ${activeAccordion === 'type' ? 'rotate-90' : ''}`} />
                            </button>
                            {activeAccordion === 'type' && (
                                <div className="flex flex-col mt-1 mb-2 bg-gray-50 rounded-lg animate-in slide-in-from-top-2">
                                    {typeOptions.map((opt) => (
                                        <div key={opt.id} onClick={() => { onTypeSelect(opt.id); setIsOpen(false); }}
                                            className="flex items-center justify-between px-10 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                            {opt.label} {selectedType === opt.id && <Check size={14} className="text-blue-500" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <button onClick={() => toggleAccordion('status')}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${activeAccordion === 'status' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-2"><Activity size={16}/> Status</div>
                                <ChevronRight size={14} className={`transition-transform duration-200 ${activeAccordion === 'status' ? 'rotate-90' : ''}`} />
                            </button>
                            {activeAccordion === 'status' && (
                                <div className="flex flex-col mt-1 mb-2 bg-gray-50 rounded-lg animate-in slide-in-from-top-2">
                                    {statusOptions.map((opt) => (
                                        <div key={opt.id} onClick={() => { onStatusSelect(opt.id); setIsOpen(false); }}
                                            className="flex items-center justify-between px-10 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                            {opt.label} {selectedStatus === opt.id && <Check size={14} className="text-blue-500" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UnifiedFilter;