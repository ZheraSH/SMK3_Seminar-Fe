// src/components/ClassMajor/ClassStudents/components/TableClassStudent.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, MoreVertical, Eye } from 'lucide-react'; 
import ModalDetailStudent from "./ModalDetailStudents";
import { getStudentDetail } from "../../../../../../Core/api/class-major/classStudentsApi"; 
// Import API dari lokasi yang benar

// ... ActionDropdown tetap sama ...

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
        <div 
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white focus:outline-none z-10"
        >
            <div className="py-1">
                <button 
                    onClick={onDetail} 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <Eye className="w-4 h-4 mr-2 text-[#3B82F6]" />
                    Detail
                </button>

                <button 
                    onClick={onDelete} 
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4 mr-2 text-[#FF5E53]" />
                    Hapus
                </button>
            </div>
        </div>
    );
};


const DataTable = ({ students , loading , removeStudent }) => {

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [selectedStudentDetail, setSelectedStudentDetail] = useState(null); 
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false); 

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };
    
    const closeDropdown = () => {
        setOpenDropdownIndex(null);
    };

    // FUNGSI UTAMA UNTUK MENGAMBIL DETAIL SISWA
    const handleDetail = async (studentData) => {
        setOpenDetailModal(true); 
        setSelectedStudentDetail(null); // Reset detail agar modal menampilkan loading
        setDetailLoading(true); 
        
        // Pengecekan ID sebelum memanggil API (untuk mencegah error 404 dari bug ID)
        if (!studentData.id) {
             console.error("ID Siswa tidak ditemukan:", studentData);
             setDetailLoading(false);
             setSelectedStudentDetail({ error: "ID siswa hilang." });
             closeDropdown();
             return;
        }

        try {
            // Panggil API untuk detail lengkap siswa MENGGUNAKAN ID SISWA
            const detail = await getStudentDetail(studentData.id); 
            
            // Tambahkan data Kelas (karena detail API mungkin tidak memuat nama kelas)
            const finalDetail = {
                ...detail,
                // Gunakan properti yang ada di studentData dari daftar kelas jika detail API tidak punya
                class_name: studentData.classroom_student?.classroom?.name || 'N/A' 
            };

            setSelectedStudentDetail(finalDetail);
        } catch (error) {
            console.error("Gagal memuat detail siswa:", error);
            setSelectedStudentDetail({ error: "Gagal memuat data." });
        } finally {
            setDetailLoading(false);
        }
        closeDropdown();
    };

    const handleDelete = (data) => {
        if (window.confirm(`Yakin ingin menghapus siswa ${data.name} dari kelas ini?`)) {
            removeStudent(data.id);
        }
        closeDropdown();
    };
    
    const handleCloseDetailModal = () => {
        setOpenDetailModal(false);
        setSelectedStudentDetail(null);
    };

    // ... getRFIDAction tetap sama ...

    return (
        <>
            <div className="bg-white shadow-sm rounded-lg overflow-x-auto border border-gray-300">
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
                        {loading && (
                            <tr>
                                <td colSpan="7" className="text-center py-10">
                                    <div className="flex justify-center items-center space-x-2">
                                        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-600">Memuat data...</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        
                        {!loading && students.map((data, index) => (
                            <tr key={data.id} className="hover:bg-gray-50">
                                
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data.nisn}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {data.gender === 'L' ? 'Laki-laki' : data.gender === 'P' ? 'Perempuan' : data.gender || '-'}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${data.status === 'Aktif' ? 'bg-[#10B98133] text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {data.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{data.rfid?.rfid|| "Belum dapat rfid"}</td>
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
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalDetailStudent
                open={openDetailModal}
                onClose={handleCloseDetailModal}
                student={selectedStudentDetail} 
                loading={detailLoading} // Kirim status loading
            />
        </>
    );
};

export default DataTable;