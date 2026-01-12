import React from "react";
import { Trash2 } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = "Hapus Data Ini?", message = "Tindakan ini tidak dapat dibatalkan. Data yang dihapus akan hilang secara permanen dari sistem.",loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div  className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
        <div className="relative bg-white rounded-[16px] shadow-xl max-w-md h-[274] w-[408px] p-5 overflow-hidden transform transition-all flex flex-col items-center text-center">
            <div className="mb-1 p-4"> <Trash2 className="w-[48px] h-[48px] text-red-500" strokeWidth={1.5} /></div>
            <h3 className="text-[20px] font-semibold text-gray-900 mb-2"> {title} </h3>
            <p className="text-gray-600 text-[14px]  leading-relaxed mb-10 px-4"> {message} </p>
            <div className="flex space-x-4 w-full justify-center">
                <button onClick={onClose} className="w-[80px] h-[37px] bg-white border border-gray-300 rounded-[10px] cursor-pointer text-gray-700 text-[14px] font-medium hover:bg-gray-50 transition">
                    Batal
                </button>
                <button onClick={onConfirm} disabled={loading} className={`w-[80px] h-[37px] bg-[#EF4444] text-white rounded-[10px] text-[14px] font-medium hover:bg-red-600 transition cursor-pointer flex items-center justify-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Hapus"
                        )}
                </button>
            </div>
        </div>
    </div>
  );
};

export default DeleteConfirmModal;