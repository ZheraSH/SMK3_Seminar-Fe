import React, { useState, useEffect, useRef } from 'react';
import { UserCheck2, Users, GraduationCap, ArrowLeft, MoreVertical, PencilLine, Trash2, Plus } from 'lucide-react';
import useClassSchedule from '../../../../Core/hooks/OperatorHooks/schedule/useClassSchedule'; 

import AddScheduleModal from "./components/FormSchedule"; 

const DAY_MAPPING = {
    'Senin': 'monday',
    'Selasa': 'tuesday',
    'Rabu': 'wednesday',
    'Kamis': 'thursday',
    'Jum\'at': 'friday',
};

const ScheduleDetailPage = ({ selectedClassroomData, handleBackToClasses }) => {
    
    const [activeDay, setActiveDay] = useState('Senin'); 
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const dropdownRef = useRef(null);
    
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at'];
    const classroom = selectedClassroomData;
    const classroomId = classroom?.id || null; 
    const activeDayApi = DAY_MAPPING[activeDay];

    const { classSchedule, isLoadingSchedule, refetch,saveSchedule,removeSchedule,} = useClassSchedule(classroomId, activeDayApi);

    const schedulesToDisplay = classSchedule?.schedules || []; 

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const openAddModal = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (itemData) => {
        setEditingItem(itemData);
        setIsModalOpen(true);
        setOpenDropdownId(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        refetch(); 
    };

    const handleDeleteSchedule = async (itemData) => {
        setOpenDropdownId(null);
    
        const scheduleId = itemData.id;
        const subjectName = itemData.subject;
    
        if (!scheduleId) {
            alert("ID Jadwal tidak ditemukan. Gagal menghapus.");
            return;
        }

        if (window.confirm(`Yakin ingin menghapus jadwal mata pelajaran **${subjectName}** pada jam ${itemData.time}?`)) {
            try {
                await removeSchedule(scheduleId);
                alert(`✅ Jadwal ${subjectName} berhasil dihapus dari hari ${activeDay}!`);
            } catch (error) {
                const errorMessage = error.message || error.response?.data?.message || `Gagal menghapus jadwal ${subjectName}.`;
                alert(`❌ Error: ${errorMessage}`);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null); 
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdownId]);
        
    if (!classroom) return <div className="p-4 text-center text-red-500">Data Kelas tidak ditemukan.</div>;

    return (
        <div className="p-2">
            <div className="bg-[url('/images/background/bg04.png')] h-[142px] text-white rounded-xl shadow-md mb-6">
                <div className="flex justify-between items-center mb-6 text-white">
                    <div>
                        <span className='text-center flex flex-row gap-3 text-xl font-semibold ml-4 mt-4'>
                            <GraduationCap size={25}/>{classroom.name}
                        </span>
                        <p className="ml-5 text-sm">Kelas - {classroom.name}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-6 mt-11 text-sm ml-5">
                    <div className="flex items-center space-x-2">
                        <UserCheck2 size={20} /> <span className='text-sm'>{classroom.homeroom_teacher}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users size={20} /> <span className='text-sm'>{classroom.total_students}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <GraduationCap size={20} /> <span className='text-sm'>{classroom.school_year}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pb-2 mb-4 bg-white rounded-lg drop-shadow-sm p-2 h-[60px] ">
                <div className="flex space-x-1 bg-[#EFF1F3] h-[48px] py-1 px-1 rounded-lg">
                    {days.map(day => (
                        <button key={day} onClick={() => setActiveDay(day)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ${
                                activeDay === day ? 'bg-[#3B82F6] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {day}
                        </button>
                    ))}
                </div>
                <button onClick={handleBackToClasses}  className="flex items-center space-x-1 text-[#FF5E53] font-semibold border border-[#FF5E53] px-3 py-2 rounded-lg text-sm">
                    <ArrowLeft size={16} />
                    <span>Kembali</span>
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="overflow-x-auto rounded-md">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 ">
                        <thead className="bg-[#3B82F6] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">No</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Penempatan</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Waktu</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Mata pelajaran</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Guru</th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            
                            {isLoadingSchedule && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-blue-500 font-semibold">
                                        Memuat jadwal hari {activeDay}...
                                    </td>
                                </tr>
                            )}
                            
                            {!isLoadingSchedule && schedulesToDisplay.length > 0 ? (
                                schedulesToDisplay.map((item, index) => {
                                    const istirahat = item.placement.toLowerCase() === 'istirahat';
                                    const timeTextClass = istirahat ? 'text-[#FFD400]' : 'text-[#3B82F6]';
                                
                                    return (
                                        <tr key={item.id} className={'hover:bg-gray-50'}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.placement}</td>
                                            <td className={`px-4 py-3 whitespace-nowrap text-sm ${timeTextClass} font-semibold`}>{item.time}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-sm">{item.subject}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.subject_teacher}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center relative">
                                                <button onClick={() => toggleDropdown(item.id)} 
                                                    className='p-1 text-gray-500 hover:text-gray-700 focus:outline-none'
                                                ><MoreVertical className='w-5 h-5'/></button>
                                                
                                                {openDropdownId === item.id && (
                                                    <div ref={dropdownRef} className="absolute right-0 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded-md shadow-xl z-20">
                                                        <button 
                                                            onClick={() => openEditModal(item)}
                                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <PencilLine className="w-4 h-4 mr-3 text-[#FACC15]" />Edit
                                                        </button>
                                                        <button 
                                                           onClick={() => handleDeleteSchedule(item)}
                                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                            <Trash2 className="w-4 h-4 mr-3 text-[#FF5E53]" /> Hapus
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : !isLoadingSchedule && ( 
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                        Tidak ada jadwal pelajaran untuk hari **{activeDay}** ini.
                                    </td>
                                </tr>
                            )}
                            
                            <tr>
                               <td colSpan={6} className='text-center py-2' >
                                    <button onClick={openAddModal} className="inline-flex items-center space-x-2 bg-[#3B82F6] text-white py-2 px-4 rounded-lg font-semibold transition duration-200 shadow-sm hover:bg-blue-700">
                                        <Plus size={16} />
                                        <span>Tambah Mata Pelajaran</span>
                                    </button>
                               </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>      
            <AddScheduleModal isOpen={isModalOpen} onClose={closeModal} initialData={editingItem} activeDayApi={activeDayApi}classroomId={classroomId}handleSave={saveSchedule}/>
        </div>
    );
};

export default ScheduleDetailPage;