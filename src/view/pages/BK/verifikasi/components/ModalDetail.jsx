import { div } from 'framer-motion/client';
import { X, Check, X as RejectIcon } from 'lucide-react';

export default function DetailIzinModal({ isOpen, onClose, permissionData,loading ,onApprove, onReject}) {
    if (!isOpen || !permissionData) return null;

    const { student, classroom,counselor, type_label, start_date, reason, status_label,proof } = permissionData;
    const isPending = status_label === "Menunggu" || status === "pending";
    const StatusModalBadge = ({ status }) => {
        const color = status === "Di Setujui" ? "text-green-600 font-bold" : 
                      status === "Ditolak" ? "text-red-600 font-bold" :
                      status === "Menunggu" ? "text-yellow-600 font-bold" :
                      "text-green-600 font-bold";
        return <span className={color}>{status}</span>;
    };

    const handleApproveClick = () => {
        onApprove(permissionData);
        onClose(); // Tutup modal setelah aksi
    };

    const handleRejectClick = () => {
        onReject(permissionData);
        onClose(); // Tutup modal setelah aksi
    };

    return (
        <div className="fixed  inset-0 bg-black/50 flex items-center justify-center -mt-20 z-50 p-4"onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-[536px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center pb-3 mb-2">
                        <h3 className="text-[24px] font-semibold text-gray-800">Detail Izin</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>
                    {
                        loading && (
                            <div className='flex justify-center items-center text-center'>
                                <span>Sedang memuat</span>
                            </div>
                        )
                    }

                    {
                        !loading && (
                            <>
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-2">Bukti Pendukung</h4>
                                    <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 rounded-lg overflow-hidden">
                                        {proof ? (
                                            <a 
                                                href={proof} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className='h-full w-full'
                                            >
                                                <img 
                                                    src={proof} 
                                                    alt="IMG (Bukti Izin)" 
                                                    className='h-full w-full object-cover cursor-pointer' 
                                                />
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">Tidak ada bukti</span>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-2 pb-1">Informasi Siswa</h4>
                                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                                        <p className="text-gray-600">Nama</p><p className="font-medium">: {student?.name || '-'}</p>
                                        <p className="text-gray-600">Kelas</p><p className="font-medium">: {classroom?.name || classroom?.message}</p>
                                        <p className="text-gray-600">Verifikator</p><p className="font-medium">: {counselor?.name || 'Belum Diverifikasi'}</p> 
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <h4 className="font-semibold text-gray-700 mb-2 pb-1">Informasi Izin</h4>
                                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                                        <p className="text-gray-600">Jenis Izin</p><p className="font-medium">: {type_label || '-'}</p>
                                        <p className="text-gray-600">Tanggal</p><p className="font-medium">: {start_date || '-'}</p>
                                        <p className="text-gray-600">Status</p><p className="font-medium">: <StatusModalBadge status={status_label} /></p>
                                    </div>
                                    <div className='mt-3'>
                                        <p className="text-gray-600 font-semibold mb-1">Alasan</p>
                                        <p className="text-sm text-gray-700  p-3 rounded-md">{reason || 'Tidak ada alasan yang diberikan.'}</p>
                                    </div>
                                </div>
                                 {isPending && (
                                    <div className="p-4  flex justify-center gap-3  bottom-0">
                                        
                                        <button 
                                            onClick={handleRejectClick}
                                            className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out"
                                        >
                                            <RejectIcon size={20} className="mr-2"/>
                                            Tolak
                                        </button>
                                        
                                        <button 
                                            onClick={handleApproveClick}
                                            className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150 ease-in-out"
                                        >
                                            <Check size={20} className="mr-2"/>
                                            Setujui
                                        </button>
                                    </div>
                                )}
                            </>
                        )
                    }
                </div>
               
            </div>
        </div>
    );
}