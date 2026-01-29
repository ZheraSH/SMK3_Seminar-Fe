import { useState } from 'react';
import CardList from './components/CardShedule';
import ClockSchedule from './components/ClockShedule';
import FilterDropdown from './components/FilterData';
import useSchedule from '../../../../Core/hooks/operator-hooks/schedule/useSchedule';
import ScheduleDetailPage from './SheduleDetail';
import Pagination from "./components/PaginitionShedule";
import {Search,Settings } from "lucide-react";
import Header1 from "../../../components/elements/header/Header-new";
import LoadingData from '../../../components/elements/loadingData/loading';

function ClassScheduleManager() {

    const { activeTab, setActiveTab, scheduleData, loading, handleViewSchedule, selectedClassroomData, handleBackToClasses, filters, filterOptions, handleFilterChange, page, lastPage, handlePageChange,searchText, handleSearchChange} = useSchedule({ initialMajor: "" });
    const displayClassData = scheduleData;
    const isMainTabActive = activeTab === 'kelas';

    return (
        <div className=" bg-gray-50 min-h-screen  lg:mb-30 mb-20 md:mb-0">
            <div className='hidden md:block'>
                {isMainTabActive && (
                    loading ? (
                        <LoadingData loading={loading} type='header1' />
                    ) : (
                        <Header1 
                            span="Kelola Jadwal Pelajaran" 
                            p="Daftar Kelas" 
                            src='/images/particle/particle11.png' 
                        />
                    )
                )}
            </div>

            {isMainTabActive && (
                <>
                    {activeTab === 'kelas' && (
                        loading? (<LoadingData loading={loading} type='create2'/>)
                        : (
                            <div className="flex justify-between items-center mb-6 lg:flex-row md:flex-row flex-col lg:mx-0 md:mx-3">
                                <div>
                                    <div className='flex flex-row'>
                                        <div className="relative flex items-center lg:w-80 mr-3">
                                            <Search className="absolute left-3 w-5 h-5 text-gray-400"/>
                                            <input type="text" placeholder="Cari Kelas/Wali Kelas..." value={searchText} onChange={(e) => handleSearchChange(e.target.value)} className="p-2 pl-10 border border-gray-300 rounded-full lg:w-full bg-white w-[220px] focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div>
                                            <FilterDropdown filters={filters} options={filterOptions} onChange={handleFilterChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='lg:mt-0 md:mt-0 mt-4'>
                                        <button onClick={() => setActiveTab('jam')} className='text-[14px] lg:w-[221px] md:w-[221px]  w-[340px] font-medium drop-shadow-sm border border-gray-200 text-white h-[40px] bg-[#3B82F6]  hover:bg-[#2563EB] px-3 rounded-[8px] flex flex-row gap-2 justify-center items-center cursor-pointer'><Settings className='w-5 h-5'/>Setting Jam Pelajaran</button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </>
            )}

           {activeTab === 'kelas' && (
                <>
                    {loading ? (
                       <LoadingData loading={loading} type='cardclass' count={9}/>
                    ) : (
                        <>
                            {displayClassData && displayClassData.length > 0 ? (
                                <>
                                    <CardList handleViewSchedule={handleViewSchedule} schedule={displayClassData}/>
                                    <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange}/>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
                                    <img  src="/images/null/null2.png"  alt="Data Kosong"  className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
                                    <p className="text-gray-500 text-center text-sm md:text-md"> Belum ada jadwal di hari ini, silahkan klik “ Tambah Jam ” untuk <br />  menambahkan jam pelajaran!</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {activeTab === 'jam' && <ClockSchedule handleBackToClasses={handleBackToClasses} />}
            {activeTab === 'jadwal-kelas' && (
                <ScheduleDetailPage selectedClassroomData={selectedClassroomData} handleBackToClasses={handleBackToClasses} setActiveTab={setActiveTab}/>
            )}
        </div>
    );
}

export default ClassScheduleManager;
