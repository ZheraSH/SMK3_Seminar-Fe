import { Plus } from 'lucide-react';

export const PermissionHeader = ({ onAddClick }) => {
  return (
    <div className="flex border border-gray-300 p-2 rounded-[9px] shadow-lg justify-between items-center mb-8 mt-8">
      <h1 className="text-[24px] ml-2 font-bold text-gray-900">
        Daftar Izin Aktif
      </h1>
      <button
        onClick={onAddClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition"
      >
        <Plus size={20} />
        Buat Izin
      </button>
    </div>
  );
};
