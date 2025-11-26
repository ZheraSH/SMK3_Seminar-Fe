import React, { useState, useRef, useEffect } from 'react';
import { Trash2, MoreVertical, Eye } from 'lucide-react'; 
import ModalDetailStudent from "./ModalDetailStudents";

const ResultModal = ({ show, title, message, status, onClose }) => {
    if (!show) return null;

    const bgColor = status === 'success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'; 
    const titleColor = status === 'success' ? 'text-[#059669]' : 'text-[#DC2626]'; 

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-80 p-6">
                <h3 className={`text-xl font-bold ${titleColor} mb-2`}>{title}</h3>
                <p className="text-sm text-gray-700 mb-4">{message}</p>
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-150 ${bgColor} hover:opacity-80`}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Penghapusan</h3>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg text-white font-semibold bg-[#EF4444] hover:bg-red-700 transition-colors"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActionDropdown = ({ onDetail, onDelete, onClose }) => {
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

    return (
        <div  ref={dropdownRef} className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white focus:outline-none z-10">
            <div className="py-1">
                <button onClick={onDetail} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye className="w-4 h-4 mr-2 text-[#3B82F6]" />Detail
                </button>
                <button onClick={onDelete} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2 text-[#FF5E53]" />
                    Hapus
                </button>
            </div>
        </div>
    );
};

const DataTable = ({ students, loading, removeStudent, paginationMeta, actionLoading,fetchStudentDetail,selectedStudentDetail,detailLoading}) => {

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ show: false, student: null, message: '' });
    const [resultModal, setResultModal] = useState({ show: false, status: '', title: '', message: '' });

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };
    
    const closeDropdown = () => {
        setOpenDropdownIndex(null);
    };

    const handleDetail = async (data) => {
        setOpenDetailModal(true); 
        closeDropdown();
        
        const studentId = data.student.id; 
        
        if (!studentId) {
            console.error("ID Siswa tidak ditemukan:", data);
            return;
        }

        await fetchStudentDetail(studentId); 
    };

  const confirmRemoval = async () => {
        const studentData = confirmModal.student;
        const studentIdToRemove = studentData.student.id; 
        
        setConfirmModal({ show: false, student: null, message: '' }); 

        try {
            const result = await removeStudent(studentIdToRemove); 

            if (result.success) {
                setResultModal({
                    show: true,
                    status: 'success',
                    title: 'Berhasil Dihapus!',
                    message: `Siswa ${studentData.student.name} berhasil dihapus dari kelas.`
                });
            } else {
                const errorMessage = result.error?.response?.data?.message || "Gagal menghapus siswa. Silakan cek koneksi atau server.";
                setResultModal({
                    show: true,
                    status: 'error',
                    title: 'Gagal Menghapus',
                    message: errorMessage
                });
            }
        } catch (error) {
            setResultModal({
                show: true,
                status: 'error',
                title: 'Kesalahan Jaringan',
                message: "Terjadi kesalahan saat menghubungi server."
            });
        }
    };
    
    const handleDelete = (data) => { 
        setConfirmModal({ 
            show: true, 
            student: data, 
            message: `Yakin ingin menghapus siswa ${data.student.name} dari kelas ini?` 
        });
        closeDropdown();
    };

    const handleCloseResultModal = () => {
        setResultModal({ show: false, status: '', title: '', message: '' });
    };
    
    const handleCloseDetailModal = () => {
        setOpenDetailModal(false);
    };

    const calculateIndex = (index) => {
        const perPage = paginationMeta?.per_page || 8; 
        const currentPage = paginationMeta?.current_page || 1;
        return ((currentPage - 1) * perPage) + index + 1;
    };

    const showLoadingOverlay = loading || actionLoading;

    return (
        <>
            <div className="bg-white shadow-sm rounded-lg overflow-x-auto border border-gray-300 relative">
                <table className="min-w-full divide-y divide-gray-200">
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
                            <tr>
                                <td colSpan="7" className="text-center py-8">
                                    <div className="flex justify-center items-center space-x-2">
                                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-600 font-semibold">
                                            {actionLoading ? 'Memproses aksi...' : 'Memuat data...'}
                                        </span>
                                    </div>
                                </td>
                            </tr>
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
                                        <td className="px-6 py-4 whitespace-nowrap">{data.rfid?.rfid || "Belum dapat rfid"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="relative inline-block text-left">
                                                <button className="p-1 text-gray-500 hover:text-gray-700" 
                                                    onClick={() => toggleDropdown(index)}>
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                {openDropdownIndex === index && (
                                                    <ActionDropdown
                                                        onDetail={() => handleDetail(data)} 
                                                        onDelete={() => handleDelete(data)}
                                                        onClose={closeDropdown}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        Tidak ada siswa di kelas ini.
                                    </td>
                                </tr>
                            )
                        )}
                        
                    </tbody>
                </table>
            </div>

            <ModalDetailStudent
                open={openDetailModal}
                onClose={handleCloseDetailModal}
                student={selectedStudentDetail} 
                loading={detailLoading} 
            />
            <ConfirmModal
                show={confirmModal.show}
                message={confirmModal.message}
                onConfirm={confirmRemoval}
                onCancel={() => setConfirmModal({ show: false, student: null, message: '' })} // Batalkan jika TIDAK
            />

            <ResultModal
                show={resultModal.show}
                status={resultModal.status}
                title={resultModal.title}
                message={resultModal.message}
                onClose={handleCloseResultModal}
            />
        </>
    );
};

export default DataTable;