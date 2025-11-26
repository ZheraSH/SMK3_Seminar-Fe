import React, { useState } from 'react';
import { Trash2 ,Plus} from 'lucide-react';
import useLessonHours from '../../../../../Core/hooks/operator-hooks/schedule/useLessonShedule';
import AddLessonHourModal from './FormLesson'; 



const ConfirmModal = ({ show, message, onConfirm, onCancel, isProcessing }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Penghapusan</h3>
                <p className="text-sm text-gray-700 mb-6">Apakah anda yakin mau menghapus?</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="px-4 py-2 text-sm rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="px-4 py-2 text-sm rounded-lg text-white font-semibold bg-[#EF4444] hover:bg-red-700 transition-colors disabled:bg-red-300"
                    >
                        {isProcessing ? 'Menghapus...' : 'Ya, Hapus'}
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
const daysIndo = Object.keys(DAY_MAPPING); 

const ScheduleLayout = ({ mode,classScheduleData}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ show: false, id: null, name: '' });
    const [resultModal, setResultModal] = useState({ show: false, status: '', title: '', message: '' });
    const [isDeleting, setIsDeleting] = useState(false); 
    
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    const isClassMode = mode === 'jadwal-kelas';
    const [activeDayIndo, setActiveDayIndo] = useState('Senin');
    
    const activeDayApi = DAY_MAPPING[activeDayIndo] || 'monday';

    const { lessonHours, isLoadingHours ,deleteLesson,refetch,addLesson} = useLessonHours(activeDayApi); 
    
    const dataForDisplay = isClassMode ?classScheduleData : lessonHours;
    
    const tableHeaders = ['No', 'Waktu', 'Penempatan', 
        ...(isClassMode ? ['Mata Pelajaran', 'Guru'] : []), 
        'Aksi'
    ];

    const openConfirmDeleteModal = (id, name) => {
        setConfirmModal({ show: true, id: id, name: name});
    };
    
    const handleConfirmDelete = async () => {
        const { id, name } = confirmModal;

        if (!id) return;

        setIsDeleting(true);
        setConfirmModal({ show: false, id: null, name: '' }); 
        try {
            const result = await deleteLesson(id);
            
            setResultModal({ show: true, status: 'success', title: 'Berhasil Dihapus!'});
            refetch(); 
            
        } catch (error) {
            setResultModal({ show: true, status: 'error', title: 'Gagal Menghapus', });
        } finally {
            setIsDeleting(false);
        }
    };
    
    const handleCloseResultModal = () => {
        setResultModal({ show: false, status: '', title: ''});
    };

    return (
        <div className="flex flex-col gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="bg-[#FFF5E3] p-4 rounded-md mb-3">
                    <p className="text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
                        <ul className="list-disc text-sm space-y-1 ml-4">
                            <li>Pada Pengaturan Awal, Jam Pelajaran Dimulai pada Jam 07:00.</li>
                            <li>Saat Anda Menambah Jam Pelajaran, Hanya Perlu Menambah Menit, Jam Akan Otomatis Bertambah Sesuai Menit dan Jam Pelajaran Terakhir</li>
                            <li>Saat Menghapus Data, Maka Yang Terakhir Dalam Jam Pelajaran Akan Terhapus</li>
                        </ul>
                </div>
                

                <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg shadow-inner w-fit mb-6">
                    {daysIndo.map(day => (
                        <button 
                            key={day} 
                            onClick={() => setActiveDayIndo(day)}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                                activeDayIndo === day 
                                ? 'bg-[#3B82F6] text-white shadow-md' 
                                : 'bg-transparent text-gray-700 hover:bg-white'
                            }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#3B82F6] text-white">
                            <tr>
                                {tableHeaders 
                                    .filter(h => h !== '') 
                                    .map(header => (
                                    <th key={header} className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-center">
                            
                            {isLoadingHours && mode === 'jam' && (
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
                                    <tr key={slot.id || index} className="hover:bg-gray-50">
                                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className={`px-6 py-3 whitespace-nowrap text-sm font-semibold ${slot.name === 'Istirahat' || slot.isBreak ? 'text-[#FACC15] font-bold' : 'text-[#3B82F6]'}`}>
                                            {slot.time_range || slot.time} 
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{slot.name || slot.designation}</td>
                                        {isClassMode && (
                                            <>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{slot.subject || '-'}</td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{slot.teacher || '-'}</td>
                                            </>
                                        )}
                                        <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                                            {!isClassMode && ( 
                                                <button onClick={() => openConfirmDeleteModal(slot.id, slot.name)} disabled={isDeleting} className="text-red-500 hover:text-red-700 ml-2">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {!isClassMode && (
                    <div className='flex justify-center items-center'>
                        <button onClick={handleOpenModal} className="mt-6 gap-2 px-4 py-2 text-sm text-center flex flex-row bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-md">
                            <Plus size={20}/> Tambah Jam
                        </button>
                    </div>
                )}
            </div>
            <AddLessonHourModal isVisible={isModalOpen} onClose={handleCloseModal} activeDay={activeDayApi} onSuccessfulSubmit={refetch} addLesson={addLesson}/>
            <ConfirmModal
                show={confirmModal.show}
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmModal({ show: false, id: null, name: '' })}
                isProcessing={isDeleting}
            />

        </div>
    );
};

export default ScheduleLayout;