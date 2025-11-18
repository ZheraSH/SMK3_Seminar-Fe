// src/components/ClassMajor/ClassStudents/components/ModalDetailStudents.jsx

import { X } from "lucide-react";

// Tambahkan prop 'loading'
export default function ModalDetailStudent({ open, onClose, student, loading }) {
    if (!open) return null;

    const getGenderLabel = (genderCode) => {
        if (!genderCode) return '-';
        // Asumsi API mengembalikan label/deskripsi, jika hanya L/P, gunakan ternary:
        return genderCode === 'L' ? 'Laki-laki' : genderCode === 'P' ? 'Perempuan' : genderCode;
    };
    
    // Tampilkan pesan error jika ada
    if (student?.error) {
        return (
             <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white w-[400px] rounded-xl p-8 shadow-xl relative animate-fadeIn text-center">
                    <h2 className="text-xl text-red-600 mb-4">Gagal Memuat Detail</h2>
                    <p>{student.error}</p>
                    <button onClick={onClose} className="mt-6 px-6 py-2 bg-gray-400 text-white rounded-lg">Tutup</button>
                </div>
             </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[699px] rounded-xl p-8 shadow-xl relative animate-fadeIn">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={26} />
                </button>

                <h2 className="text-xl mb-2 pb-2">
                    Detail Siswa
                </h2>
                
                {/* Tampilan Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Memuat detail siswa...</p>
                    </div>
                )}

                {/* Tampilan Data Detail */}
                {!loading && student && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-gray-200 rounded-full" />
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 text-sm gap-x-6">
                            {/* Baris 1 */}
                            <p><strong>Nama:</strong> {student.name || '-'}</p>
                            <p><strong>NISN:</strong> {student.nisn || '-'}</p>

                            {/* Baris 2 */}
                            <p><strong>Kelas:</strong> {student.classroom.name || (student.classroom?.name || '-')}</p> 
                            <p><strong>Jenis Kelamin:</strong> {getGenderLabel(student.gender) || '-'}</p>

                            {/* Baris 3 */}
                            <p><strong>Agama:</strong> {student.religion?.name || student.religion || '-'}</p>
                            <p><strong>Tempat Lahir:</strong> {student.birth_place || '-'}</p>

                            {/* Baris 4 */}
                            <p><strong>Tanggal Lahir:</strong> {student.birth_date || '-'}</p>
                            <p><strong>No KK:</strong> {student.number_kk || '-'}</p>

                            {/* Baris 5 */}
                            <p><strong>No Akta:</strong> {student.number_akta|| '-'}</p>
                            <p><strong>Anak Ke:</strong> {student.order_child || '-'}</p>

                            {/* Baris 6 */}
                            <p><strong>Jumlah Saudara:</strong> {student.count_siblings || '-'}</p>
                        </div>

                        <div className="mt-5 text-sm flex flex-row gap-3">
                            <strong>Alamat:</strong>
                            <p>{student.address || '-'}</p>
                        </div>
                    </>
                )}
                
                <button
                    onClick={onClose}
                    className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 block mx-auto"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}