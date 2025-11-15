"use client";
import { X } from 'lucide-react';

export function RfidAddModal({
  show,
  newData,
  onDataChange,
  onAdd,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[560px] shadow-lg relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-[24px] font-medium mb-4">Tambah Kartu RFID</h2>

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            Pengguna
          </label>
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            value={newData.nama}
            onChange={(e) =>
              onDataChange({ ...newData, nama: e.target.value })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg placeholder:text-[12px]"
          />
        </div>

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            Id Kartu
          </label>
          <input
            type="text"
            placeholder="Masukkan id kartu"
            value={newData.idKartu}
            onChange={(e) =>
              onDataChange({ ...newData, idKartu: e.target.value })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg placeholder:text-[12px]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[14px] text-gray-600 mb-1">
            Status Awal
          </label>
          <select
            value={newData.status}
            onChange={(e) =>
              onDataChange({
                ...newData,
                status: e.target.value,
              })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg text-[12px]"
          >
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onAdd}
            className="bg-[#3B82F6] text-white text-[14px] px-4 py-2 h-[37px] w-[90px] rounded-[10px] hover:bg-blue-700"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}