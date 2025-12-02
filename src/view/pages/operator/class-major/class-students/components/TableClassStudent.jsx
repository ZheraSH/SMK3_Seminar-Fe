import React, { useState, useRef, useEffect } from 'react';
import { Trash2, MoreVertical, Eye } from 'lucide-react'; 
import ModalDetailStudent from "./ModalDetailStudents"; 

const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"> 
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Penghapusan</h3>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors">
                        Batal
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 rounded-lg text-white font-semibold bg-[#EF4444] hover:bg-red-700 transition-colors">
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};


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
        <div 
            ref={dropdownRef} 
            className={`fixed w-36 rounded-md shadow-lg bg-white focus:outline-none z-50`} 
            style={{ 
                left: `${xOffset}px`, 
                ...yStyle
            }}>
            <div className="py-1">
                <button 
                    onClick={onDetail} 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye className="w-4 h-4 mr-2 text-[#3B82F6]" />Detail
                </button>
                <button 
                    onClick={onDelete} 
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2 text-[#FF5E53]" />Hapus
                </button>
            </div>
        </div>
    );
};

const DataTable = ({ students, loading, removeStudent, paginationMeta, actionLoading, fetchStudentDetail, selectedStudentDetail, detailLoading}) => {

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
        const studentId = data.student.id; 
        if (!studentId) { console.error("ID Siswa tidak ditemukan:", data); return;}
        await fetchStudentDetail(studentId); 
    };

    const handleDelete = (data) => { 
        setConfirmModal({ show: true, student: data, message: `Yakin ingin menghapus siswa ${data.student.name} dari kelas ini?` });
        closeDropdown();
    };
    
    const confirmRemoval = async () => {
        const studentData = confirmModal.student;
        const studentIdToRemove = studentData.student.id; 
        setConfirmModal({ show: false, student: null, message: '' }); 

        try {
            const result = await removeStudent(studentIdToRemove); 

            if (result.success) {
                setResultModal({ show: true, status: 'success', title: 'Berhasil Dihapus!', message: `Siswa ${studentData.student.name} berhasil dihapus dari kelas.`});
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
            <div className="bg-white shadow-sm rounded-xl border border-gray-300 relative overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-[#3B82F6] text-white sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">NISN</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jenis Kelamin</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">RFID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading || actionLoading ? (
                            <tr><td colSpan="7" className="text-center py-8">
                                <div className="flex justify-center items-center space-x-2">
                                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-gray-600 font-semibold">{actionLoading ? 'Memproses aksi...' : 'Memuat data...'}</span>
                                </div>
                            </td></tr>
                        ) : (
                            students && students.length > 0 ? (
                                students.map((data, index) => (
                                    <tr key={data.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{calculateIndex(index)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.student.nisn}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {data.student.gender === 'L' ? 'Laki-laki' : data.student.gender === 'P' ? 'Perempuan' : data.student.gender || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${data.status === 'Aktif' ? 'bg-[#10B98133] text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {data.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data.rfid?.rfid || "-"}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="inline-block text-left">
                                                <button className="p-1 text-gray-500 hover:text-gray-700" 
                                                    ref={el => actionButtonRefs.current[index] = el}
                                                    onClick={() => toggleDropdown(index)}>
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="7" className="text-center py-8 text-gray-500">Tidak ada siswa di kelas ini.</td></tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {openDropdownData.index !== null && (
                <ActionDropdown 
                    onDetail={() => handleDetail(students[openDropdownData.index])}  
                    onDelete={() => handleDelete(students[openDropdownData.index])} 
                    onClose={closeDropdown} 
                    position={openDropdownData.position}  
                    direction={openDropdownData.direction}
                />
            )}

            <ModalDetailStudent open={openDetailModal} onClose={handleCloseDetailModal} student={selectedStudentDetail}  loading={detailLoading} />
            <ConfirmModal show={confirmModal.show} message={confirmModal.message} onConfirm={confirmRemoval} onCancel={() => setConfirmModal({ show: false, student: null, message: '' })} />
        </>
    );
};

export default DataTable;