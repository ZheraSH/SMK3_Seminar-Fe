import { X } from "lucide-react";

export default function ModalDetailStudent({ open, onClose, student, loading }) {
    if (!open) return null;

    const getGenderLabel = (genderCode) => {
        if (!genderCode) return '-';
        return genderCode === 'L' ? 'Laki-laki' : genderCode === 'P' ? 'Perempuan' : genderCode;
    };

    const detailItems = [
        { label: "NISN", value: student?.nisn || '-' },
        { label: "Jenis Kelamin", value: getGenderLabel(student?.gender.label) || '-' },
        { label: "Tempat Lahir", value: student?.birth_place || '-' },
        { label: "Tanggal Lahir", value: student?.birth_date || '-' },
        { label: "Nomor KK", value: student?.number_kk || '-' },
        { label: "Nomor Akta", value: student?.number_akta || '-' },
        { label: "Anak ke -", value: student?.order_child || '-' },
        { label: "Jumlah Saudara", value: student?.count_siblings || '-' },
    ];
    
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

    const DetailItem = ({ label, value }) => (
        <div className="flex flex-col mb-4">
            <div className="flex justify-between items-start w-64 "> 
                <span className="text-[14px] text-gray-800 flex flex-row gap-1"><p className='font-medium'>{label} :</p> {value}</span> 
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl lg:w-[600px] md:w-[600px] w-full lg:h-[545px] md:h-[545px] h-[635px] lg:mt-0 md:mt-0 -mt-10 transform transition-all scale-100 opacity-100 lg:mx-0 md:mx-4 mx-1">
                <div className="flex justify-between items-center p-6 lg:ml-3 md:ml-3">
                    <h2 className="lg:text-[24px] md:text-[24px] text-[18px] font-semibold text-gray-800">Detail Siswa</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition">
                        <X size={24} />
                    </button>
                </div>
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Memuat detail siswa...</p>
                    </div>
                ) : (
                    <div className="lg:ml-10 ml-6 max-h-[80vh] md:max-h-[70vh] lg:mx-10 mx-6 ">
                        <div className="flex lg:items-start md:items-start items-center border-b-2 border-[#9CA3AF] lg:gap-[30px] md:gap-[30px] gap-[5px] pb-4 mb-4 lg:flex-row md:flex-row flex-col">
                            <div className="lg:w-[120px] lg:h-[120px] md:w-[120px] md:h-[120px] w-18 h-18 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-[2px] border-[#6B7280] ">
                                <img src={student.image} alt="Avatar Siswa" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col lg:items-start md:items-start items-center lg:pt-4 md:pt-4 ">
                                <h3 className="text-[18px] font-semibold text-gray-900">{student?.name || '-'}</h3>
                                <p className="text-[14px] text-gray-600 mt-0.5">{student?.email || '-'}</p>
                                <span className="mt-2 text-[12px] font-medium text-white text-center bg-[#8B5CF6] py-[3px] px-2 rounded-full w-[77px] h-[24px]">
                                     {student.classroom.name || (student.classroom?.name || '-')}
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 lg:gap-y-2 md:gap-y-2 pt-2 ">
                            {detailItems.map((item, index) => (
                                <DetailItem key={index} label={item.label} value={item.value} />
                            ))}
                            <div className="sm:col-span-2 lg:mt-4 md:mt-4 w-full">
                                <span className="text-[14px] text-gray-800 mb-1 gap-1 flex flex-row"><p className='font-medium'>Alamat: </p> {student?.address || '-'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}