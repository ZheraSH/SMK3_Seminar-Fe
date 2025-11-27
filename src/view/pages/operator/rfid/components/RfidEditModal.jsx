"use client";
import { X } from "lucide-react";
import { notify } from "../../../../../Core/hooks/notification/notify";
import { updateRfidStatus } from "../../../../../Core/api/role-operator/rfid/RfidApi";

export default function RfidEditModal({ show, selected, onDataChange, onSave, onClose }) {
  if (!show || !selected) return null;

  const handleSave = async () => {
    try {
      await updateRfidStatus(selected.id, selected.status);
      notify("Berhasil Update RFID");
      onSave?.();
      onClose?.();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[560px] shadow-lg relative border border-gray-200">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-[24px] font-medium mb-4">Edit Kartu RFID</h2>

        {/* Nama */}
        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">Nama Siswa</label>
          <input
            value={selected.student?.name ?? ""}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 text-[14px] cursor-not-allowed"
          />
        </div>

        {/* RFID */}
        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">ID Kartu</label>
          <input
            value={selected.rfid ?? ""}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 text-[14px] cursor-not-allowed"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-[14px] text-gray-600 mb-1">Status</label>
          <select
            value={selected.status}
            onChange={(e) => onDataChange({ ...selected, status: e.target.value })}
            className="w-full border border-gray-400 px-3 py-2 rounded-lg text-[14px]"
          >
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[10px] border text-[14px]"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="bg-[#3B82F6] text-white text-[14px] px-4 py-2 h-[37px] w-[90px] rounded-[10px] hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}
