import { Check, X, AlertCircle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, type, studentName }) {
    if (!isOpen) return null;

    const isApprove = type === 'approve';

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6 text-center animate-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${isApprove ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isApprove ? (
                        <Check size={32} className="text-green-600" strokeWidth={3} />
                    ) : (
                        <X size={32} className="text-red-600" strokeWidth={3} />
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Konfirmasi
                </h3>
                
                <p className="text-gray-600 mb-6">
                    Apakah Anda yakin ingin <strong>{isApprove ? 'menyetujui' : 'menolak'}</strong> izin dari 
                    <span className="text-gray-800 font-semibold"> {studentName}</span>?
                </p>

                <div className="flex gap-3 mt-4">
                    <button onClick={onClose} className="flex-1 px-4 py-2 cursor-pointer border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2 text-white cursor-pointer font-medium rounded-lg shadow-md transition-all ${
                            isApprove ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                        }`}
                    >
                         {isApprove ? 'Setujui' : 'Tolak'}
                    </button>
                </div>
            </div>
        </div>
    );
}