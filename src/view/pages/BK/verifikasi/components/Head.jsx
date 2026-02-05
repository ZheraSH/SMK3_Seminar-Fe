import React, { useState, useRef, useEffect } from 'react';
import HeaderPage from "../../../../components/elements/header/Header-new";
import { Search} from "lucide-react";
import Filter from './Filter';
import Filter2 from './filter2';
import LoadingData from '../../../../components/elements/loadingData/loading';

export default function HeaderAndControls ({handleClassSelect, searchQuery, onSearchChange, 
    classOptions = [], selectedClassId,loading,selectedType, onTypeSelect,selectedStatus,onStatusSelect}) {
    
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    return (
        <>
            {loading?(<LoadingData loading={loading} type='header1'/>)
            :(
                <HeaderPage span={"Manajemen Verifikasi Izin Siswa"} p={"Laporan Verifikasi Surat Izin Ketidakhadiran Siswa."} src="/images/particle/particle6.png" className="!h-[103px] !w-[120px] mt-[18px] mr-10 opacity-90"/>
            )}
            {loading?(<LoadingData loading={loading} type='create'/>)
            :(
                <div className='w-full lg:h-[60px] md:h-[60px] sm:h-[100px] mb-4 lg:mb-0'>
                <div className="flex flex-col gap-3 md:gap-0 lg:gap-0 md:flex-row lg:flex-row">
                        <div className="flex lg:flex-row md:flex-row flex-col gap-3 w-full ml-auto"> 
                            <div className="relative flex">
                                <input type="text" placeholder="Cari Nama..." className="lg:w-[300px] md:w-[170px] w-full h-10 py-2 pl-10 pr-4 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm text-sm" value={searchQuery} onChange={handleSearchChange}/>
                                <Search className="absolute lg:right-67 md:right-35 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                            
                            <div className=' flex flex-row gap-3'>
                                <Filter classOptions={classOptions}
                                selectedClassId={selectedClassId}
                                handleClassSelect={handleClassSelect}
                                selectedType={selectedType}
                                onTypeSelect={onTypeSelect}
                                selectedStatus={selectedStatus}
                                onStatusSelect={onStatusSelect}/>
                                {/* <Filter2 selectedType={selectedType} onTypeSelect={onTypeSelect}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}