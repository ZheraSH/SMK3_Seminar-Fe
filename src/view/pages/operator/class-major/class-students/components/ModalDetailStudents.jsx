// src/components/ClassMajor/ClassStudents/components/ModalDetailStudents.jsx

import { X } from "lucide-react";

export default function ModalDetailStudent({ open, onClose, student, loading }) {
    if (!open) return null;
    console.log("URL Gambar Siswa:", student?.image);

    const getGenderLabel = (genderCode) => {
        if (!genderCode) return '-';
        return genderCode === 'L' ? 'Laki-laki' : genderCode === 'P' ? 'Perempuan' : genderCode;
    };
    
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
            <div className="bg-white w-[699px] rounded-xl p-8 shadow-xl relative animate-fadeIn mx-3">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"> <X size={26} /></button>
                <h2 className="text-xl mb-2 pb-2"> Detail Siswa</h2>

                {loading && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Memuat detail siswa...</p>
                    </div>
                )}

                {!loading && student && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="flex justify-center mb-6">
                            {student.image ?
                             (
                                <img src={student.image} alt="Foto siswa" className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm mb-5"/>
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                No Image
                                </div>
                            )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 text-sm gap-x-6">
                            <p>Nama:  {student.name || '-'}</p>
                            <p>NISN:  {student.nisn || '-'}</p>
                            <p>Kelas:  {student.classroom.name || (student.classroom?.name || '-')}</p> 
                            <p>Jenis Kelamin:  {getGenderLabel(student.gender) || '-'}</p>
                            <p>Agama:  {student.religion?.name || student.religion || '-'}</p>
                            <p>Tempat Lahir:  {student.birth_place || '-'}</p>
                            <p>Tanggal Lahir:  {student.birth_date || '-'}</p>
                            <p>No KK:  {student.number_kk || '-'}</p>
                            <p>No Akta:  {student.number_akta|| '-'}</p>
                            <p>Anak Ke:  {student.order_child || '-'}</p>
                            <p>Jumlah Saudara:  {student.count_siblings || '-'}</p>
                        </div>

                        <div className="mt-5 text-sm flex flex-row gap-3">
                            Alamat: 
                            <p>{student.address || '-'}</p>
                        </div>
                    </>
                )}
                <button onClick={onClose} className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 block mx-auto"> Tutup </button>
            </div>
        </div>
    );
}