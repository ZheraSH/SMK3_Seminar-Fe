import React, { useState } from 'react';
import { Trash2 ,Plus} from 'lucide-react';
import useLessonHours from '../../../../../Core/hooks/operator-hooks/schedule/useLessonShedule';
import AddLessonHourModal from './FormLesson'; 
import DeleteConfirmModal from "../../../../components/elements/deleteconfirm/DeleteConfirmModal"; 

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
                <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${bgColor}`}>
                    {icon}  
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <button onClick={onClose} className="w-full px-4 py-2 text-sm rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"> Tutup </button>
            </div>
        </div>
    );
};

const DAY_MAPPING = { 'Senin': 'monday', 'Selasa': 'tuesday', 'Rabu': 'wednesday', 'Kamis': 'thursday', 'Jum\'at': 'friday',};
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

    const tableHeaders = ['No', 'Waktu', 'Penempatan', ...(isClassMode ? ['Mata Pelajaran', 'Guru'] : []), 'Aksi'];

    const openConfirmDeleteModal = (id, name) => { setConfirmModal({ show: true, id: id, name: name});};
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
                rorMessage = error.response.data.message;
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

    return (
        <div className="flex flex-col gap-4"> 
            <div className="bg-white p-2 md:p-6 rounded-lg shadow-xl mb-4 md:mb-8"> 
                <div className="bg-[#FFF5E3] p-3 md:p-4 rounded-md mb-4">
                    <p className="text-sm md:text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
                    <ul className="list-disc text-xs md:text-sm space-y-1 ml-4">
                        <li>Pada Pengaturan Awal, Jam Pelajaran Dimulai pada Jam 07:00.</li>
                        <li>Saat Anda Menambah Jam Pelajaran, Hanya Perlu Menambah Menit, Jam Akan Otomatis Bertambah Sesuai Menit dan Jam Pelajaran Terakhir</li>
                        <li>Saat Menghapus Data, Maka Yang Terakhir Dalam Jam Pelajaran Akan Terhapus</li>
                    </ul>
                </div>
                <div className="flex space-x-1 bg-gray-100 rounded-lg shadow-inner w-full  md:w-90 overflow-x-auto md:overflow-hidden p-1 mb-1">
                    {daysIndo.map(day => (
                        <button key={day} onClick={() => setActiveDayIndo(day)}className={`flex-shrink-0 px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${activeDayIndo === day ? 'bg-[#3B82F6] text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-white'}`}>
                            {day}
                        </button>
                    ))}
                </div>
            </div>
                <div className="border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#3B82F6] text-white">
                            <tr>
                                {tableHeaders .filter(h => h !== '') .map(header => (
                                    <th key={header} className="px-3 md:px-6 py-3 text-center text-xs font-medium uppercase tracking-wider min-w-[80px]"> {/* Min-width agar kolom tidak terlalu sempit di HP */}
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
                            ) : ( !isLoadingHours && dataForDisplay.map((slot, index) => (
                                <tr key={slot.id || index} className="hover:bg-gray-50">
                                    <td className="px-3 md:px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className={`px-3 md:px-6 py-3 whitespace-nowrap text-sm font-semibold ${slot.name === 'Istirahat' || slot.isBreak ? 'text-[#FACC15] font-bold' : 'text-[#3B82F6]'}`}>
                                        {slot.time_range || slot.time} 
                                    </td>
                                    <td className="px-3 md:px-6 py-3 whitespace-nowrap text-sm text-gray-500">{slot.name || slot.designation}</td>
                                        {isClassMode && (
                                            <>
                                                <td className="px-3 md:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{slot.subject || '-'}</td>
                                                <td className="px-3 md:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{slot.teacher || '-'}</td>
                                            </>
                                        )}
                                    <td className="px-3 md:px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                                        {!isClassMode && ( 
                                            <button onClick={() => openConfirmDeleteModal(slot.id, slot.name)} disabled={isDeleting} className="text-red-500 hover:text-red-700 ml-2">
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                            )}
                            {!isClassMode && (
                                <tr>
                                    <td colSpan={tableHeaders.length} className="px-6 py-2">
                                    <div className="flex justify-center">
                                        <button onClick={handleOpenModal} className="flex items-center text-[14px] gap-2 px-6 py-2  bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg active:scale-95">
                                            <Plus size={16} strokeWidth={3} />
                                            <span>Tambah Jam Pelajaran</span>
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            
            <AddLessonHourModal isVisible={isModalOpen} onClose={handleCloseModal} activeDay={activeDayApi} activeDayDisplay={activeDayIndo} onSuccessfulSubmit={refetch} addLesson={addLesson}/>
            <DeleteConfirmModal open={confirmModal.show} onConfirm={handleConfirmDelete} onCancel={() => setConfirmModal({ show: false, id: null, name: '' })} message={`Apakah anda yakin mau menghapus jam pelajaran ${confirmModal.name}?`}/>
            <ResultModal show={resultModal.show} status={resultModal.status} title={resultModal.title} message={resultModal.message} onClose={handleCloseResultModal}/>
        </div>
    );
};

export default ScheduleLayout;