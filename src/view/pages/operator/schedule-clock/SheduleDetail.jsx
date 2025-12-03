import { useState, useEffect, useRef } from 'react';
import { UserCheck2, Users, GraduationCap, ArrowLeft, MoreVertical, PencilLine, Trash2, Plus } from 'lucide-react';
import useClassSchedule from '../../../../Core/hooks/operator-hooks/schedule/useClassSchedule'; 

import AddScheduleModal from "./components/FormSchedule"; 

const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"> 
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100 opacity-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Penghapusan</h3>
                <p className="text-sm text-gray-700 mb-6">
                    {message}
                </p>
                
                <div className="flex justify-end space-x-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium">
                        Batal
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-white font-semibold bg-[#EF4444] hover:bg-red-700 transition-colors text-sm">
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

const DAY_MAPPING = {
    'Senin': 'monday',
    'Selasa': 'tuesday',
    'Rabu': 'wednesday',
    'Kamis': 'thursday',
    'Jum\'at': 'friday',
};

const ScheduleDetailPage = ({ selectedClassroomData, handleBackToClasses }) => {
    
    const [activeDay, setActiveDay] = useState('Senin'); 
    const [openDropdownId, setOpenDropdownId] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ show: false, item: null, message: '' });
    const dropdownRef = useRef(null);
    
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at'];
    const classroom = selectedClassroomData;
    const classroomId = classroom?.id || null; 
    const activeDayApi = DAY_MAPPING[activeDay];

    const { classSchedule, isLoadingSchedule, refetch,saveSchedule,removeSchedule,} = useClassSchedule(classroomId, activeDayApi);

    const schedulesToDisplay = classSchedule?.schedules || []; 

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? '' : id);
    };

    const openAddModal = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (itemData) => {
        setEditingItem(itemData);
        setIsModalOpen(true);
        setOpenDropdownId(''); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        refetch(); 
    };

    const handleDeleteSchedule = (itemData) => {
        setOpenDropdownId('');
        
        setConfirmModal({
            show: true,
            item: itemData,
            message: `Yakin ingin menghapus mata pelajaran ${itemData.subject} jika anda belum yakin batalkan.`
        });
    };
    
    const executeRemoval = async () => {
        const itemData = confirmModal.item;
        const scheduleId = itemData.id;
        const subjectName = itemData.subject;
        
        setConfirmModal({ show: false, item: null, message: '' });

        if (!scheduleId) {
            alert("ID Jadwal tidak ditemukan. Gagal menghapus.");
            return;
        }
        
        try {
            await removeSchedule(scheduleId);
            await refetch();
        } catch (error) {
            const errorMessage = error.message || error.response?.data?.message || `Gagal menghapus jadwal ${subjectName}.`;
            alert(`❌ Error: ${errorMessage}`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(''); 
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdownId]);
        
    if (!classroom) return <div className="p-4 text-center text-red-500">Data Kelas tidak ditemukan.</div>;

    return (
        <div className="">
            <div className="bg-[url('/images/background/bg04.png')] h-[142px] text-white rounded-xl shadow-md mb-6">
                <div className="flex justify-between items-center mb-6 text-white">
                    <div>
                        <span className='text-center flex flex-row gap-3 lg:text-[20px] md:text-[18px] text-sm font-semibold ml-4 mt-4'>
                            <GraduationCap className='lg:size-[25px] md:size-[23px] size-[20px]'/>{classroom.name}
                        </span>
                        <p className="ml-5  lg:text-[12px] md:text-[11px] text-[10px] ">Kelas - {classroom.name}</p>
                    </div>
                </div>
                <div className="flex items-center lg:space-x-6 md:space-x-6 space-x-4 lg:mt-10 md:mt-12 mt-15 text-sm ml-5  lg:text-sm md:text-[13px] text-[12px] ">
                    <div className="flex items-center space-x-2">
                        <UserCheck2 className='lg:size-[18px] md:size-[16px] size-[14px]' /> <span className=''>{classroom.homeroom_teacher}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users className='lg:size-[18px] md:size-[16px] size-[14px]' /> <span className=''>{classroom.total_students}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <GraduationCap className='lg:size-[18px] md:size-[16px] size-[14px]' /> <span className=''>{classroom.school_year}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between items-center pb-2 mb-4 bg-white rounded-lg drop-shadow-sm p-2 md:h-[60px] gap-3 md:gap-0">
                <div className="flex space-x-1 bg-[#EFF1F3] w-full md:w-auto overflow-x-auto p-1 rounded-lg flex-shrink-0">
                    {days.map(day => (
                        <button key={day} onClick={() => setActiveDay(day)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ${
                                activeDay === day ? 'bg-[#3B82F6] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {day}
                        </button>
                    ))}
                </div>
                <button onClick={handleBackToClasses} className="flex items-center justify-center md:justify-start space-x-1 text-[#FF5E53] font-semibold border border-[#FF5E53] px-3 py-2 rounded-lg text-sm w-full md:w-auto hover:bg-red-50 transition-colors">
                    <ArrowLeft size={16} />
                    <span>Kembali</span>
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className=" rounded-md overflow-x-auto">
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
                                        <tr key={item.id || item.lesson_hour_id} className={'hover:bg-gray-50'}> 
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.placement}</td>
                                            <td className={`px-4 py-3 whitespace-nowrap text-sm ${timeTextClass} font-semibold`}>{item.time}</td>
                                            
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-sm">
                                                {item.subject || '—'} 
                                            </td>
                                            
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                {item.subject_teacher || '—'}
                                            </td>

                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center relative">
                                                {item.id ? ( 
                                                    <>
                                                        <button onClick={() => toggleDropdown(item.id)} 
                                                            className='p-1 text-gray-500 hover:text-gray-700 focus:outline-none'
                                                        ><MoreVertical className='w-5 h-5'/></button>
                                                        
                                                        {openDropdownId === item.id && (
                                                            <div ref={dropdownRef} className="absolute top-0 right-0 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded-md shadow-xl z-20">
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
                                                </>
                                                ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : !isLoadingSchedule && ( 
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                        Tidak ada jadwal pelajaran untuk hari {activeDay} ini.
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
        <ConfirmModal
                show={confirmModal.show}
                message={confirmModal.message}
                onConfirm={executeRemoval} 
                onCancel={() => setConfirmModal({ show: false, item: null, message: '' })} 
            />
        </div>
    );
};

export default ScheduleDetailPage;