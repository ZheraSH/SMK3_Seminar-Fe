import { useState } from 'react';
import CardList from './components/CardShedule';
import ClockSchedule from './components/ClockShedule';
import FilterDropdown from './components/FilterData';
import useSchedule from '../../../../Core/hooks/operator-hooks/schedule/useSchedule';
import ScheduleDetailPage from './SheduleDetail';
import Pagination from "./components/PaginitionShedule";
import {Search} from "lucide-react";

function ClassScheduleManager() {

    const { activeTab, setActiveTab, scheduleData, loading, handleViewSchedule, selectedClassroomData, handleBackToClasses, filters, filterOptions, handleFilterChange, page, lastPage, handlePageChange,searchText, 
        handleSearchChange} = useSchedule({ initialMajor: "" });
    // const [searchText, setSearchText] = useState("");
    const displayClassData = scheduleData;

    const isMainTabActive = activeTab === 'kelas' || activeTab === 'jam';

    return (
        <div className="p-3 bg-gray-50 min-h-screen font-sans lg:mb-10 mb-20 md:mb-30">
            {activeTab !== 'jadwal-kelas' && (
                <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-4">
                    <div className="absolute inset-0 items-center justify-center rounded-[6px] w-64 md:w-full">
                        <div className="ml-5 mt-2">
                            <h1 className="text-white text-[22px] md:text-[30px] font-semibold">
                                {activeTab === 'kelas' ? 'Jadwal Pelajaran' : 'Pengaturan Jam Belajar'}
                            </h1>
                            <p className="text-white text-[12px] md:text-[14px] font-light">
                                {activeTab === 'kelas'
                                    ? 'Pilih kelas untuk melihat dan mengatur jadwal belajar harian.'
                                    : 'Atur waktu mulai dan selesai tiap jam belajar.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {isMainTabActive && (
                <>
                    <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg drop-shadow-md">
                        <h1 className="md:text-xl text-md ml-2 text-gray-800">
                            {activeTab === 'kelas' ? 'Daftar Kelas' : 'Pengaturan Jam Pelajaran'}
                        </h1>

                        <div className="flex gap-4 p-1">
                            <button onClick={() => setActiveTab('kelas')}
                                className={`px-4 md:text-sm text-[14px] font-semibold rounded-lg shadow-md transition-colors ${
                                    activeTab === 'kelas'
                                    ? 'bg-[#3B82F6] text-white'
                                    : 'bg-[#F2F6FF] text-[#1E3A8A] hover:bg-blue-100'
                                }`}>
                                Kelas
                            </button>
                            <button onClick={() => setActiveTab('jam')}
                                className={`px-4 py-2 md:text-sm lg:text-[14px] text-[10px] font-semibold rounded-lg shadow-md transition-colors ${
                                    activeTab === 'jam'
                                    ? 'bg-[#3B82F6] text-white'
                                    : 'bg-[#F2F6FF] text-[#1E3A8A] hover:bg-blue-100'
                                }`}>
                                Jam Pelajaran
                            </button>
                        </div>
                    </div>

                    {activeTab === 'kelas' && (
                        <div className="flex justify-start items-center mb-6">
                            <div className="relative flex items-center lg:w-80 mr-3">
                               <Search className="absolute left-3 w-5 h-5 text-gray-400"/>
                              <input 
                                    type="text" 
                                    placeholder="Cari Kelas/Wali Kelas..." 
                                    value={searchText} 
                                    onChange={(e) => handleSearchChange(e.target.value)} 
                                    className="p-2 pl-10 border border-gray-300 rounded-full lg:w-full w-[220px] focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <FilterDropdown filters={filters} options={filterOptions} onChange={handleFilterChange}/>
                        </div>
                    )}
                </>
            )}

           {activeTab === 'kelas' && (
                <>
                    {loading ? (
                        <p className="text-center py-10">Loading...</p>
                    ) : (
                        <>
                            {displayClassData && displayClassData.length > 0 ? (
                                <>
                                    <CardList handleViewSchedule={handleViewSchedule} schedule={displayClassData}/>
                                    <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange}/>
                                </>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                                    <p className="text-lg text-gray-500 font-medium">
                                        Tidak ada data kelas yang ditemukan.
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Coba ubah kriteria pencarian atau filter Anda.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {activeTab === 'jam' && <ClockSchedule />}

            {activeTab === 'jadwal-kelas' && (
                <ScheduleDetailPage selectedClassroomData={selectedClassroomData} handleBackToClasses={handleBackToClasses}/>
            )}
        </div>
    );
}

export default ClassScheduleManager;
