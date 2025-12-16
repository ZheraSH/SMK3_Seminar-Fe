import React, { useState, useRef, useEffect } from 'react';
import HeaderPage from "../../../../components/elements/header/Header.Page";
import { Search} from "lucide-react";
import Filter from './Filter';

export default function HeaderAndControls ({handleClassSelect, searchQuery, onSearchChange, 
    classOptions = [], selectedClassId}) {
    
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    return (
        <>
            <HeaderPage h1={"Manajemen Verifikasi Izin Siswa"} p={"Laporan Verifikasi Surat Izin Kehadiran Siswa."}/>
            <div className='w-full lg:h-[81px] md:h-[81px] sm:h-[100px] bg-white rounded-xl shadow-lg p-5 mb-6'>
                <div className="flex flex-col gap-3 md:gap-0 lg:gap-0 md:flex-row lg:flex-row justify-between items-center">
                    <div className="lg:text-xl w-full md:text-md sm:text-sm font-semibold text-gray-800">Daftar nama siswa</div>
                    <div className="flex flex-row gap-3 w-full justify-between ml-auto"> 
                        <div className="relative flex-grow flex justify-end">
                            <input type="text" placeholder="Cari Nama..." className="lg:w-[240px] md:w-[170px] w-[160px] h-10 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm text-sm" value={searchQuery} onChange={handleSearchChange}/>
                            <Search className="absolute lg:right-52 md:right-35 right-33 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        
                        <Filter classOptions={classOptions} selectedClassId={selectedClassId} handleClassSelect={handleClassSelect}/>
                    </div>
                </div>
            </div>
        </>
    );
}