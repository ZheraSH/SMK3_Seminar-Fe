import React from 'react';

const AddSchoolYearModal = ({ isOpen, onClose, onConfirm, nextYear }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop dengan blur sesuai gambar */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-[90%] max-w-md transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
            Apakah anda ingin menambah tahun ajaran <br /> baru <span className="text-blue-600">{nextYear}</span>?
          </h3>
          
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolYearModal;