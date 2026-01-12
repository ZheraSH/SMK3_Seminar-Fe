import React, { useState ,useRef, useEffect} from 'react';
import { Trash2 ,Plus,ArrowLeftToLine,MoreVertical,PencilLine} from 'lucide-react';
import useLessonHours from '../../../../../Core/hooks/operator-hooks/schedule/useLessonShedule';
import AddLessonHourModal from './FormLesson';
import ModalDelete from '../../../../components/elements/modaldelete/ModalDelete'; 

const ActionMenu = ({ onEdit, onDelete, alignTop }) => {
    const positionClasses = alignTop ? "bottom-full mb-2" : "mt-2";
    return (
        <div className={`absolute right-8 w-[117px] rounded-lg shadow-xl bg-white z-20 border border-gray-100 ${positionClasses}`}>
            <div className="py-1">
                <button onClick={onEdit} className="flex items-center justify-between w-full px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-t-lg">
                    <PencilLine size={16} className="text-[#FFAA05] mr-3" /> Edit
                </button>
                <button onClick={onDelete} className="flex items-center w-full justify-between  px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-b-lg">
                    <Trash2 size={16} className="text-[#EF4444] mr-3" /> Hapus
                </button>
            </div>
        </div>
    );
};

const ResultModal = ({ show, status, title, message, onClose }) => {
    if (!show) return null;

    const isSuccess = status === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const icon = isSuccess ? (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        ) : (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    );

    return (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${bgColor}`}> {icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <button onClick={onClose} className="w-full px-4 py-2 text-sm rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors">Tutup</button>
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
const daysIndo = Object.keys(DAY_MAPPING); 

const ScheduleLayout = ({ mode,classScheduleData,handleBackToClasses}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ show: false, id: null, name: '' });
    const [resultModal, setResultModal] = useState({ show: false, status: '', title: '', message: '' });
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionMenuOpen, setActionMenuOpen] = useState(null); 
    const [editingData, setEditingData] = useState(null);
    const actionMenuRef = useRef(null);

    const handleOpenModal = () => {
        setEditingData(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingData(null);
    };

    const isClassMode = mode === 'jadwal-kelas';
    const [activeDayIndo, setActiveDayIndo] = useState('Senin');

    const activeDayApi = DAY_MAPPING[activeDayIndo] || 'monday';

    const { lessonHours, isLoadingHours ,deleteLesson,refetch,addLesson,updateLesson} = useLessonHours(activeDayApi); 

    const dataForDisplay = isClassMode ?classScheduleData : lessonHours;

    const tableHeaders = ['No', 'Jam Mulai', 'Jam Berakhir', 'Penempatan',  ...(isClassMode ? ['Mata Pelajaran', 'Guru'] : []), 'Aksi'];

    const toggleActionMenu = (id) => {
        setActionMenuOpen(actionMenuOpen === id ? null : id);
    };  

    const handleEdit = (slot) => {
        setActionMenuOpen(null);
        setEditingData(slot); 
        setIsModalOpen(true);
    };

    const openConfirmDeleteModal = (id, name) => {
        setActionMenuOpen(null);
        setConfirmModal({ show: true, id: id, name: name});
    };

    const handleConfirmDelete = async () => {
        const { id, name } = confirmModal;

        if (!id) return;

        setIsDeleting(true);
        setConfirmModal({ show: false, id: null, name: '' }); 

        try {
            const result = await deleteLesson(id);
            refetch(); 
        } catch (error) {
            let errorMessage = 'Data ini tidak dapat di hapus karena data ini sudah ada di jadwal.';

            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message && error.message.includes('409') || error.message.includes('relasi')) {
                errorMessage = `Jam pelajaran ${name} tidak dapat dihapus karena sudah digunakan dalam Jadwal Pelajaran atau memiliki data relasi yang terikat.`;
            }

            setResultModal({ show: true, status: 'error', title: 'Peringatan.',message: errorMessage});
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCloseResultModal = () => {
        setResultModal({ show: false, status: '', title: ''});
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && actionMenuOpen !== null && !actionMenuRef.current.contains(event.target)) {
                setActionMenuOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [actionMenuOpen]);

    return (
    <div className=" bg-gray-50 min-h-screen"> 
        <div className="bg-white p-2 md:p-6 rounded-lg shadow-xl mb-3 lg:h-[298px] md:h-[298px] h-auto mx-auto max-w-sm lg:max-w-full md:max-w-full "> 
                <div className="bg-[#FEF3C7] h-[202px] lg:p-6 md:p-4 p-3 rounded-md mb-4">
                    <p className="lg:text-[20px] md:text-[18px] sm:text-[16px] font-semibold text-[#FFAA05] mb-3">Informasi</p>
                    <ul className="list-disc lg:text-[16px] md:text-[14px] text-[12px] space-y-1 ml-4">
                        <li>Pada Pengaturan Awal, Jam Pelajaran Dimulai pada Jam 07:00.</li>
                        <li>Saat Anda Menambah Jam Pelajaran, Hanya Perlu Menambah Menit, Jam Akan Otomatis Bertambah Sesuai Menit dan Jam Pelajaran Terakhir</li>
                        <li>Saat Menghapus Data, Maka Yang Terakhir Dalam Jam Pelajaran Akan Terhapus</li>
                    </ul>
                </div>
                <div className='flex flex-col lg:flex-row md:flex-row lg:justify-between md:justify-between'> 
                    <div className="flex space-x-[6px] rounded-lg w-full overflow-x-auto mb-6 h-[52px]"> 
                        {daysIndo.map(day => (
                            <button key={day} onClick={() => setActiveDayIndo(day)}
                                className={`flex-shrink-0 px-3 py-2 h-[36px] text-[12px] font-semibold shadow-md rounded-lg transition-colors duration-200 ${ 
                                activeDayIndo === day ? 'bg-[#3B82F6] text-white' : 'bg-[#E5E7EB] border border-[#CBD5E1] text-gray-700 hover:bg-[#9CA3AF]'}`}>
                            {day}
                        </button>
                    ))}
                    </div>
                    <div className=' flex gap-4 justify-end xl:flex-row md:flex-row flex-row'>
                        <button onClick={handleOpenModal} className='bg-[#3B82F6] hover:bg-[#2563EB] rounded-[8px] border h-[36px] w-[166px] border-gray-200 text-center flex items-center px-4 text-white flex flex-row gap-2 lg:text-[14px] md:text-[14px] text-[12px] font-medium cursor-pointer'> <Plus size={20}/>Tambah Jam</button>
                        <button onClick={handleBackToClasses} className='bg-[#E5E7EB] rounded-[8px] border h-[36px] w-[166px] border-gray-200 flex flex-row items-center px-4 justify-center gap-2 font-medium lg:text-[14px] md:text-[14px] text-[12px] hover:bg-[#9CA3AF]'>< ArrowLeftToLine size={20}/> Kembali</button>
                    </div>
                </div>
            </div> 
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#3B82F6] text-white">
                        <tr>
                            {tableHeaders .filter(h => h !== '') .map(header => (
                                <th key={header} className="px-4 py-3 text-center text-[14px] font-medium  min-w-[150px]"> {/* Min-width agar kolom tidak terlalu sempit di HP */}
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {isLoadingHours && ( 
                            <tr>
                                <td colSpan={tableHeaders.length} className="px-6 py-4 text-center text-gray-500">Memuat jam pelajaran untuk {activeDayIndo}...</td>
                            </tr>
                        )}
                        
                        {!isLoadingHours && dataForDisplay.length === 0 ? (
                            <tr>
                                <td colSpan={tableHeaders.length} className="px-6 py-4 text-center text-gray-500">Tidak ada jam pelajaran yang diatur untuk hari **{activeDayIndo}**.</td>
                            </tr>
                        ) : (
                            !isLoadingHours && dataForDisplay.map((slot, index) => (
                                <tr key={slot.id || index} className={` ${index % 2 === 1 ? 'bg-[#EFF6FF]' : 'bg-white'} hover:bg-gray-50 text-[14px] font-medium`}>
                                    <td className=" py-3 whitespace-nowrap text-gray-900">{index + 1}</td>
                                    <td className={` py-3 whitespace-nowrap ${slot.name === 'Istirahat' || slot.isBreak ? 'text-[#F59E0B] font-medium' : 'text-[#22C55E]'}`}>
                                        {slot.start_time} 
                                    </td>
                                    <td className={` py-3 whitespace-nowrap ${slot.name === 'Istirahat' || slot.isBreak ? 'text-[#F59E0B] font-medium' : 'text-[#22C55E]'}`}>
                                        {slot.end_time} 
                                    </td>
                                    <td className=" py-3 whitespace-nowrap  text-gray-500">{slot.name || slot.designation}</td>
                                        {isClassMode && (
                                            <>
                                                <td className=" py-3 whitespace-nowrap  text-gray-700">{slot.subject || '-'}</td>
                                                <td className=" py-3 whitespace-nowrap  text-gray-700">{slot.teacher || '-'}</td>
                                            </>
                                        )}
                                    <td className=" py-3 whitespace-nowrap text-center relative font-medium">
                                        {!isClassMode && ( 
                                            <div className="relative inline-block text-left" ref={actionMenuOpen === slot.id ? actionMenuRef : null}>
                                                <button  onClick={() => toggleActionMenu(slot.id)}  disabled={isDeleting}  className="text-gray-500 hover:text-gray-700 p-1 rounded-full  cursor-pointer">
                                                    <MoreVertical size={20} />
                                                </button>
                                                {actionMenuOpen === slot.id && (
                                                    <ActionMenu alignTop={index >= dataForDisplay.length - 2}  onEdit={() => handleEdit(slot)} onDelete={() => openConfirmDeleteModal(slot.id, slot.name)}/>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
      
            <AddLessonHourModal isVisible={isModalOpen} onClose={handleCloseModal} activeDay={activeDayApi} activeDayDisplay={activeDayIndo} onSuccessfulSubmit={refetch} addLesson={addLesson} updateLesson={updateLesson} initialData={editingData}/>
            <ModalDelete isOpen={confirmModal.show} onConfirm={handleConfirmDelete} onClose={() => setConfirmModal({ show: false, id: null, name: '' })} isProcessing={isDeleting}/>
            <ResultModal show={resultModal.show} status={resultModal.status} title={resultModal.title} message={resultModal.message} onClose={handleCloseResultModal}/>
        </div>
    );
};

export default ScheduleLayout;