import React, { useState, useRef, useEffect } from 'react';
import HeaderPage from "../../../../components/elements/header/Header.Page";
import { Search, ChevronRight } from "lucide-react";

function ClassDropdown({ classes, selectedClassId, handleClassSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = selectedClassId 
        ? classes.find(cls => cls.name === selectedClassId)?.name || selectedClassId
        : 'Kelas';

    const dropdownRef = useRef(null);
    const closeDropdown = () => setIsOpen(false);

    const handleItemClick = (classId) => {
        handleClassSelect(classId);
        setIsOpen(false);
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


    return (
        <div className="relative w-full sm:w-[150px]" ref={dropdownRef}>
            <button type="button" className="w-full h-10 py-2 px-4 flex items-center justify-between  rounded-lg bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 " onClick={() => setIsOpen(!isOpen)}>
                <span className="truncate">{selectedLabel}</span>
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? 'transform rotate-90 text-blue-500' : 'text-gray-500'}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-3 w-full rounded-md bg-white drop-shadow-xl  focus:outline-none"style={{ maxHeight: '200px', overflowY: 'auto' }} >
                    <div className="py-1">
                        <div className={`block px-4 py-2 text-sm cursor-pointer rounded-lg ${selectedClassId === '' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleItemClick('')}>
                            Semua Kelas
                        </div>
                        {classes.map((cls) => (
                            <div key={cls.id} className={`block px-4 py-2 text-sm cursor-pointer rounded-lg ${selectedClassId === cls.name ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleItemClick(cls.name)}>
                                {cls.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function HeaderAndControls ({ handleClassSelect, searchQuery, onSearchChange, classes = [], selectedClassId}) {
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    return (
        <>
            <HeaderPage h1={"Manajemen Verifikasi Izin Siswa"} p={"Laporan Verifikasi Surat Izin Kehadiran Siswa."}/>
            <div className='w-full h-[81px] bg-white rounded-xl shadow-lg p-5 mb-6'>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800 hidden sm:block">Daftar nama siswa</div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto ml-auto"> 
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Cari Kelas/Nama..." className="w-full sm:w-[244px] h-10 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm text-sm" value={searchQuery} onChange={handleSearchChange}/>
                        </div>
                        <ClassDropdown classes={classes} selectedClassId={selectedClassId} handleClassSelect={handleClassSelect}/>
                    </div>
                </div>
            </div>
        </>
    );
}