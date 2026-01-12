import { useState, useEffect, useRef } from 'react';
import { ArrowLeft,Settings } from 'lucide-react';
import useClassSchedule from '../../../../Core/hooks/operator-hooks/schedule/useClassSchedule'; 
import AddScheduleModal from "./components/FormSchedule"; 
import Header2 from '../../../components/elements/header/Header-new';
import ScheduleTable from './components/TableSheduleDetail';
import ModalDelete from '../../../components/elements/modaldelete/ModalDelete';

const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null; 
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"> 
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100 opacity-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Penghapusan</h3>
                <p className="text-sm text-gray-700 mb-6"> {message} </p>
                <div className="flex justify-end space-x-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium"> Batal </button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-white font-semibold bg-[#EF4444] hover:bg-red-700 transition-colors text-sm"> Ya, Hapus </button>
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

const ScheduleDetailPage = ({ selectedClassroomData, handleBackToClasses ,setActiveTab}) => {

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

    const openEditModal = (item) => {
        console.log("Data yang akan diedit:", item);

        const formattedData = {
            id: item.id,
            subject_id: item.subject?.id || '', 
            teacher_id: item.teacher?.id || '',
            lesson_hour_id: item.lesson_hour?.id || '',
            subject_name: item.subject?.name || '',
            teacher_name: item.teacher?.name || '',
            lesson_hour_name: item.lesson_hour?.name || ''
        };
    
        setEditingItem(formattedData);
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
        setConfirmModal({ show: true, item: itemData, message: null});
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
            refetch();
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
            <Header2 span={`Jadwal Kelas ${classroom.name}`} p={`Daftar kelas - ${classroom.name}`} src='/images/particle/particle3.png' />
            <div className="flex flex-col lg:flex-row lg:justify-between  md:flex-row md:justify-between  items-center pb-2 mb-4  md:h-[60px] gap-3 md:gap-0">
                <div className="flex space-x-2 w-full md:w-auto overflow-x-auto p-1 rounded-lg flex-shrink-0">
                    {days.map(day => (
                        <button key={day} onClick={() => setActiveDay(day)} className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 drop-shadow-sm ${
                                activeDay === day ? 'bg-[#3B82F6] text-white' : 'text-gray-600 bg-[#E5E7EB] border border-[#CBD5E1]'}`}>
                            {day}
                        </button>
                    ))}
                </div>
                <div className='flex flex-row gap-2 w-full lg:w-auto'>
                    <button onClick={() => setActiveTab('jam')} className='flex-1 lg:flex-none text-[10px] lg:text-[14px] font-medium drop-shadow-sm border border-gray-200 text-white h-[40px] bg-[#3B82F6] hover:bg-[#2563EB] px-3 rounded-[8px] flex flex-row gap-2 justify-center items-center cursor-pointer'>
                        <Settings className='w-5 h-5'/> <span>Setting Jam Pelajaran</span>
                    </button>
                    <button  onClick={handleBackToClasses}  className="flex-1 lg:flex-none flex items-center justify-center space-x-1 font-semibold border border-[#D1D5DB] bg-white px-3 py-2 rounded-lg text-sm">
                        <ArrowLeft size={16} /> <span>Kembali</span>
                    </button>
                </div>
            </div>
            <ScheduleTable isLoading={isLoadingSchedule} activeDay={activeDay} schedules={schedulesToDisplay} toggleDropdown={toggleDropdown} openDropdownId={openDropdownId} dropdownRef={dropdownRef} onEdit={openEditModal} onDelete={handleDeleteSchedule} onAdd={openAddModal}/>         
            <AddScheduleModal isOpen={isModalOpen} onClose={closeModal} initialData={editingItem} activeDayApi={activeDayApi}classroomId={classroomId} handleSave={saveSchedule}/>
            <ModalDelete isOpen={confirmModal.show}  onConfirm={executeRemoval}  onClose={() => setConfirmModal({ show: false, item: null, message: null })}  />
        </div>
    );
};
export default ScheduleDetailPage;