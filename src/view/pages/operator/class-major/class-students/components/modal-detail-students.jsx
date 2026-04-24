import { X } from "lucide-react";
import { useState } from "react";

export default function ModalDetailStudent({ open, onClose, student, loading }) {
    const [showFullAddress, setShowFullAddress] = useState(false);

    if (!open) return null;

    const getGenderLabel = (genderCode) => {
        if (!genderCode) return '-';
        return genderCode === 'L' ? 'Laki-laki' : genderCode === 'P' ? 'Perempuan' : genderCode;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return "-";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const detailItems = [
        { label: "NISN", value: student?.nisn || '-' },
        { label: "Jenis Kelamin", value: getGenderLabel(student?.gender?.label) || '-' },
        { label: "Tempat Lahir", value: student?.birth_place || '-' },
        { label: "Tanggal Lahir", value: formatDate(student?.birth_date) || '-' },
        { label: "Nomor KK", value: student?.number_kk || '-' },
        { label: "Nomor Akta", value: student?.number_akta || '-' },
        { label: "Anak ke -", value: student?.order_child || '-' },
        { label: "Jumlah Saudara", value: student?.count_siblings || '-' },
    ];
    
    const address = student?.address || '-';
    const MAX_ADDRESS_LENGTH = 60; 
    const isAddressLong = address.length > MAX_ADDRESS_LENGTH;
    const displayAddress = isAddressLong && !showFullAddress 
        ? `${address.substring(0, MAX_ADDRESS_LENGTH)}...` 
        : address;

    if (student?.error) {
        return (
             <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                 <div className="bg-white w-full max-w-[400px] rounded-xl p-8 shadow-xl relative animate-fadeIn text-center">
                     <h2 className="text-xl text-red-600 mb-4">Gagal Memuat Detail</h2>
                     <p>{student.error}</p>
                     <button onClick={onClose} className="mt-6 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">Tutup</button>
                 </div>
             </div>
        )
    }

    const DetailItem = ({ label, value }) => (
        <div className="flex flex-col mb-3 lg:mb-4 w-full">
            <div className="flex flex-col sm:flex-row sm:gap-1 w-full text-[14px] text-gray-800"> 
                <span className='font-medium whitespace-nowrap'>{label} :</span> 
                <span className="break-words text-gray-600 sm:text-gray-800">{value}</span>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] lg:h-[545px] md:h-[545px] h-auto max-h-[90vh] flex flex-col transform transition-all scale-100 opacity-100">
                
                <div className="flex justify-between items-center p-5 lg:p-6 border-b lg:border-b-0 border-gray-200">
                    <h2 className="text-[18px] md:text-[24px] font-semibold text-gray-800 lg:ml-3">Detail Siswa</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition bg-gray-100 lg:bg-transparent">
                        <X size={20} className="lg:w-6 lg:h-6" />
                    </button>
                </div>
                
                <div className="overflow-y-auto overflow-x-hidden flex-1 pb-6 px-5 lg:px-10 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-600">Memuat detail siswa...</p>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-start border-b-2 border-[#9CA3AF] gap-4 md:gap-[30px] pb-5 mb-5 mt-2 md:mt-0 text-center md:text-left">
                                <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-[#6B7280]">
                                    <img src={student?.image} alt="Avatar Siswa" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-center md:items-start md:pt-4">
                                    <h3 className="text-[18px] md:text-[20px] font-semibold text-gray-900">{student?.name || '-'}</h3>
                                    <p className="text-[14px] text-gray-600 mt-0.5">{student?.email || '-'}</p>
                                    <span className="mt-2 text-[12px] font-medium text-white text-center bg-[#8B5CF6] py-[3px] px-3 rounded-full">
                                         {student?.classroom?.name || '-'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-12 gap-y-1 lg:gap-y-2">
                                {detailItems.map((item, index) => (
                                    <DetailItem key={index} label={item.label} value={item.value} />
                                ))}
                                
                                <div className="sm:col-span-2 mt-2 w-full">
                                    <div className="flex flex-col sm:flex-row sm:gap-1 text-[14px] text-gray-800 w-full">
                                        <span className='font-medium whitespace-nowrap'>Alamat :</span> 
                                        <span className="break-words text-gray-600 sm:text-gray-800">
                                            {displayAddress}
                                            {isAddressLong && (
                                                <button 
                                                    onClick={() => setShowFullAddress(!showFullAddress)}
                                                    className="ml-1 text-blue-600 hover:text-blue-800 font-medium transition focus:outline-none"
                                                >
                                                    {showFullAddress ? "Tampilkan lebih sedikit" : "Selengkapnya"}
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}