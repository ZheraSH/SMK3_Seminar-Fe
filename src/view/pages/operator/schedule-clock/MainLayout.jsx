
import CardList from './components/CardShedule';
import ClockSchedule from './components/ClockShedule';
import FilterDropdown from './components/FilterData';
import useSchedule from '../../../../Core/hooks/schedule/useSchedule';

function ClassScheduleManager() {
    const {
        selectedFilter,
        schedule,
        activeTab,
        setActiveTab,
        setSelectedFilter,
        handleViewSchedule,
    } = useSchedule();
    
    

    // FILTER LOGIC
    const filteredClassData =
        selectedFilter === "Show all"
            ? schedule
            : schedule.filter((item) =>
                item.className.includes(selectedFilter) ||
                item.year === selectedFilter
            );

    

    const isMainTabActive = activeTab === 'kelas' || activeTab === 'jam';

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">

            {/* HEADER BLUE BANNER */}
            <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-4">
                <div className="absolute inset-0 items-center justify-center rounded-[6px]">
                    <div className="ml-5 mt-2">
                        <h1 className="text-white text-[30px] font-semibold">
                            {activeTab === 'kelas' ? 'Jadwal Pelajaran' : 'Pengaturan Jam Belajar'}
                        </h1>
                        <p className="text-white text-[14px] font-light">
                            {activeTab === 'kelas'
                                ? 'pilih kelas untuk melihat dan mengatur jadwal belajar harian.'
                                : 'Atur waktu mulai dan selesai tiap jam belajar.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* NAVIGASI: KELAS / JAM */}
            {isMainTabActive && (
                <>
                    <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg drop-shadow-md">
                        <h1 className="text-xl ml-2 text-gray-800">
                            {activeTab === 'kelas' ? 'Daftar Kelas' : 'Pengaturan Jam Pelajaran'}
                        </h1>

                        <div className="flex gap-4 p-1">

                            {/* TAB KELAS */}
                            <button
                                onClick={() => setActiveTab('kelas')}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-colors ${
                                    activeTab === 'kelas'
                                        ? 'bg-[#3B82F6] text-white'
                                        : 'bg-[#F2F6FF] text-[#1E3A8A] hover:bg-blue-100'
                                }`}
                            >
                                Kelas
                            </button>

                            {/* TAB JAM */}
                            <button
                                onClick={() => setActiveTab('jam')}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-colors ${
                                    activeTab === 'jam'
                                        ? 'bg-[#3B82F6] text-white'
                                        : 'bg-[#F2F6FF] text-[#1E3A8A] hover:bg-blue-100'
                                }`}
                            >
                                Jam Pelajaran
                            </button>

                        </div>
                    </div>

                    {/* FILTER AREA (Hanya jika tab 'kelas') */}
                    {activeTab === 'kelas' && (
                        <>
                            <div className="flex justify-start items-center mb-6">

                                {/* SEARCH */}
                                <div className="relative flex items-center w-80 mr-4">
                                    <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                                        </path>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Cari Kelas/Wali Kelas..."
                                        className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* FILTER DROPDOWN (NEW!) */}
                                <FilterDropdown
                                    selected={selectedFilter}
                                    onSelect={(value) => setSelectedFilter(value)}
                                />
                            </div>

                            <hr className="mb-6 border-gray-300" />
                        </>
                    )}
                </>
            )}

            {/* LIST KELAS */}
            {activeTab === 'kelas' && (
                <>
                    {schedule.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <CardList
                                handleViewSchedule={handleViewSchedule}
                                schedule={filteredClassData}
                            />

                            
                            <div className="flex justify-center mt-8">
                                {/* Pagination jika dibutuhkan */}
                            </div>
                        </>

                    ) }
                    
                </>
            )}

            {/* DETAIL JAM & JADWAL */}
            {(activeTab === 'jam' || activeTab === 'jadwal-kelas') && (
                <ClockSchedule
                    mode={activeTab}
                    schedule={schedule}
                    setSelectedTab={setActiveTab}
                />
            )}
        </div>
    );
}

export default ClassScheduleManager;
