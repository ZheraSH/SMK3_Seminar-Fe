import React from 'react';
import { X, Check, X as RejectIcon } from 'lucide-react';
import { useState } from 'react';

export default function DetailIzinModal({ isOpen, onClose, permissionData, loading, onConfirmAction }) {
    if (!isOpen || !permissionData) return null;
      const [previewOpen, setPreviewOpen] = useState(false);

    const { student, classroom, counselor, type, date, reason, status, proof } = permissionData;
    const isPending = status?.label?.toLowerCase() === "menunggu" || status?.value === "pending";

    const StatusModalBadge = ({ status }) => {
        const color = status === "Disetujui" ? "text-white bg-green-600 rounded-full px-2 py-1 text-[12px] font-bold" : 
                      status === "Ditolak" ? " text-white bg-red-600 rounded-full px-2 py-1 text-[12px] font-bold" :
                      status === "Menunggu" ? "text-white bg-yellow-600 rounded-full px-2 py-1 text-[12px] font-bold" :
                      "text-green-600 font-bold";
        return <span className={color}>{status}</span>;
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-center pb-3 mb-2">
                        <h3 className="text-[24px] font-semibold text-gray-800">Detail Izin</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {loading ? (
                        <div className='flex flex-col py-10 justify-center items-center text-center'>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                            <span className="text-gray-500">Sedang memuat data...</span>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Bukti Pendukung</h4>
                                <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-500 rounded-lg overflow-hidden border-2 border-dashed border-gray-200">
                                    {proof ? (
                                            <img src={proof} alt="Bukti Izin" onClick={() => setPreviewOpen(true)} className=' w-full h-32 mt-2 rounded-md object-cover border border-gray-300 bg-gray-200 shadow-sm cursor-zoom-in hover:scale-[1.02] hover:shadow-md transition-all duration-300' />
                                    ) : (
                                        <span className="text-gray-400 text-sm">Tidak ada bukti gambar</span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-2 pb-1">Informasi Siswa</h4>
                                <div className="flex flex-col space-y-2 text-sm mt-2 w-full">
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Nama</p>
                                        <p className="font-medium">: {student?.name || '-'}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Kelas</p>
                                        <p className="font-medium">: {classroom?.name || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <h4 className="font-semibold text-gray-700 mb-2 pb-1">Informasi Izin</h4>
                                <div className="flex flex-col space-y-2 text-sm mt-2 w-full">
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Jenis Izin</p>
                                        <p className="font-medium">: {type?.label || '-'}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Tanggal Mulai</p>
                                        <p className="font-medium">: {formatDate(date?.start || '-')}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Tanggal Berakhir</p>
                                        <p className="font-medium">: {formatDate(date?.end || '-')}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Verifikator</p>
                                        <p className="font-medium">: {counselor?.name || 'Belum Diverifikasi'}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-gray-600 w-32 shrink-0">Status</p>
                                        <div className="flex items-center">
                                            <span className="mr-1">:</span>
                                            <StatusModalBadge status={status?.label} />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600 w-32 shrink-0">Alasan</p>
                                        
                                        <div className="flex w-full min-w-0">
                                            <span className="mr-1">:</span>
                                            <p className="text-gray-700 break-all whitespace-normal leading-relaxed">
                                                {reason || 'Tidak ada alasan yang diberikan.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isPending && (
                                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                    <button onClick={() => onConfirmAction('reject', permissionData)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-all active:scale-95"
                                    >
                                        <RejectIcon size={18} className="mr-2"/>
                                        Tolak
                                    </button>
                                    <button 
                                        onClick={() => onConfirmAction('approve', permissionData)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-all active:scale-95"
                                    >
                                        <Check size={18} className="mr-2"/>
                                        Setujui
                                    </button>
                                </div>
                            )}
                            {previewOpen && (
                                <div onClick={() => setPreviewOpen(false)} className=" fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center animate-fadeIn">
                                    <img src={permission.proof} alt="Preview bukti" className=" max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl animate-zoomIn"/>
                                    <button
                                        onClick={() => setPreviewOpen(false)} className=" absolute top-6 right-6 text-white/80 hover:text-white transition " >
                                        <X size={28} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}