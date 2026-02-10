import React, { useState, useRef, useEffect } from 'react';
import { Trash2, MoreVertical, Eye } from 'lucide-react'; 
import ModalDetailStudent from "./ModalDetailStudents"; 
import ModalDelete from "../../../../../components/elements/modaldelete/ModalDelete";

const ActionDropdown = ({ onDetail, onDelete, onClose, position, direction }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!position) return null;
    let xOffset = position.x - 144; 
    let yStyle = {};

    if (direction === 'up') {
        yStyle = { 
            bottom: window.innerHeight - position.y + 8, 
            top: 'auto' 
        };
    } else {
        yStyle = { 
            top: position.y + 40, 
            bottom: 'auto' 
        };
    }

    return (
        <div ref={dropdownRef} className={`fixed w-[117px] rounded-md shadow-lg bg-white focus:outline-none z-50`} style={{ left: `${xOffset}px`,  ...yStyle }}>
            <div className="py-1 flex flex-col justify-between  px-2">
                <button onClick={onDetail} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:rounded-sm">
                    <Eye className="w-4 h-4 mr-3 text-[#3B82F6]" />Detail
                </button>
                <button 
                    onClick={onDelete} 
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:rounded-sm">
                    <Trash2 className="w-4 h-4 mr-2 text-[#FF5E53]" />Hapus
                </button>
            </div>
        </div>
    );
};

const DataTable = ({ students, loading, removeStudent, paginationMeta, actionLoading, fetchStudentDetail, selectedStudentDetail, detailLoading,currentPage}) => {
    const [openDropdownData, setOpenDropdownData] = useState({ index: null, position: null, direction: 'down' });
    const actionButtonRefs = useRef([]); 
    
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ show: false, student: null, message: '' });
    const [resultModal, setResultModal] = useState({ show: false, status: '', title: '', message: '' });

    const toggleDropdown = (index) => {
        const isCurrentlyOpen = openDropdownData.index === index;
        
        if (isCurrentlyOpen) {
            closeDropdown();
            return;
        }

        const buttonElement = actionButtonRefs.current[index];
        if (!buttonElement) return;

        const rect = buttonElement.getBoundingClientRect(); 
        const totalStudents = students.length;
        const cutoff = Math.floor(totalStudents * 0.6); 
        const direction = (index >= cutoff && totalStudents > 5) ? 'up' : 'down';
        
        setOpenDropdownData({ index: index, position: { x: rect.right, y: rect.top },  direction: direction});
    };
    
    const closeDropdown = () => {
        setOpenDropdownData({ index: null, position: null, direction: 'down' });
    };

    const handleDetail = async (data) => {
        setOpenDetailModal(true); 
        closeDropdown();
        const studentId = data.id; 
        if (!studentId) { console.error("ID Siswa tidak ditemukan:", data); return;}
        await fetchStudentDetail(studentId); 
    };

    const handleDelete = (data) => { 
        setConfirmModal({ show: true, student: data, message: null });
        closeDropdown();
    };
    
    const confirmRemoval = async () => {
        const studentData = confirmModal.student;
        const studentIdToRemove = studentData.id; 
        

        try {
            const result = await removeStudent(studentIdToRemove); 

            setConfirmModal({ show: false, student: null, message: '' }); 
            if (result.success) {
                setResultModal({  show: true,  status: 'success',  title: 'Berhasil Dihapus!',  message: `Siswa ${studentData.name} berhasil dihapus dari kelas.`});
            } else {
                const errorMessage = result.error?.response?.data?.message || "Gagal menghapus siswa. Silakan cek koneksi atau server.";
                setResultModal({ show: true, status: 'error', title: 'Gagal Menghapus', message: errorMessage});
            }
        } catch (error) {
            setResultModal({ show: true, status: 'error', title: 'Kesalahan Jaringan', message: "Terjadi kesalahan saat menghubungi server."});
        }
    };
    const handleCloseDetailModal = () => { setOpenDetailModal(false); };
        
    const calculateIndex = (index) => {
        const perPage = paginationMeta?.per_page || 8; 
        const currentPage = paginationMeta?.current_page || 1;
        return ((currentPage - 1) * perPage) + index + 1;
    };

    return (
        <>
           <div className="bg-white shadow-sm rounded-xl border border-gray-300 relative overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-fixed divide-y divide-gray-200 text-center text-sm">
                        <thead className="bg-blue-600  text-white sticky top-0 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap font-medium w-[5%]">No</th>
                                <th className="px-2 py-3 whitespace-nowrap font-medium w-[10%]">Foto</th>
                                <th className="px-2 py-3 whitespace-nowrap font-medium w-[25%] ">Nama</th>
                                <th className="px-2 py-3 whitespace-nowrap font-medium w-[15%]">NISN</th>
                                <th className="px-6 py-3 whitespace-nowrap font-medium w-[15%]">Jenis Kelamin</th>
                                <th className="px-2 py-3 whitespace-nowrap font-medium w-[15%]">Status</th>
                                <th className="px-2 py-3 whitespace-nowrap font-medium w-[10%]">RFID</th>
                                <th className="px-2 py-4 whitespace-nowrap font-medium w-[5%]">Aksi</th>
                            </tr>
                        </thead>

                        {students && students.length > 0 ? (
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {students.map((data, index) => (
                                        <tr key={data.id} className={`${index % 2 === 1 ? 'bg-indigo-50' : 'bg-white'} text-gray-700 hover:bg-indigo-100 transition-colors text-[14px]`}>
                                            <td className="px-4 py-3 whitespace-nowrap">{calculateIndex(index)}</td>
                                            <td className="px-2 py-2 whitespace-nowrap flex justify-center">
                                                <div className='rounded-full w-10 h-10 overflow-hidden bg-gray-200 border border-gray-300'>
                                                    {data.image ? (
                                                        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full font-bold text-gray-500">
                                                            {data.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap font-medium text-gray-900">{data.name}</td>
                                            <td className="px-2 py-3 whitespace-nowrap">{data.nisn || '-'}</td>
                                            <td className="px-2 py-3 whitespace-nowrap">
                                                {data.gender === 'male' || data.gender === 'L' ? 'Laki-laki' : 
                                                data.gender === 'female' || data.gender === 'P' ? 'Perempuan' : '-'}
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex font-medium rounded-full text-[12px]
                                                    ${data.status?.value === 'active' ? 'bg-[#22C55E] text-white' : 'bg-[#EF4444] text-white'}`}>
                                                    {data.status?.label || data.status || '-'}
                                                </span>
                                            </td>
                                            <td className="px-2 py-3 whitespace-nowrap font-mono ">
                                                {data.rfid?.rfid || <span className="text-gray-400 italic text-[20px]">-</span>}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="inline-block text-center relative">
                                                    <button  className="p-1 rounded-full  transition-colors" ref={el => actionButtonRefs.current[index] = el} onClick={() => toggleDropdown(index)}>
                                                        <MoreVertical className="w-5 h-5 text-gray-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr><td colSpan="8" className="text-center py-10 text-gray-500 font-medium">Tidak ada siswa di kelas ini.</td></tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
           </div>

            {openDropdownData.index !== null && (
                <ActionDropdown  onDetail={() => handleDetail(students[openDropdownData.index])}  onDelete={() => handleDelete(students[openDropdownData.index])}  onClose={closeDropdown}  position={openDropdownData.position}  direction={openDropdownData.direction}/>
            )}

            <ModalDetailStudent open={openDetailModal} onClose={handleCloseDetailModal} student={selectedStudentDetail} loading={detailLoading} />
            <ModalDelete  isOpen={confirmModal.show} onConfirm={confirmRemoval}  onClose={() => setConfirmModal({ show: false, student: null, message: '' })}  loading={actionLoading}/>
        </>
    );
};

export default DataTable;
