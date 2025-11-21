"use client";
import { X } from "lucide-react";
import axios from "axios";
export function RfidEditModal({
  show,
  selected,
  onDataChange,
  onSave,
  onClose,
}) {
  if (!show || !selected) return null;

  const updateRfidStatus = async (rfidId, status) => {
    try {
      const payload = { status }; // cuma status yang dikirim
      const res = await axios.put(
        `http://127.0.0.1:8000/api/rfids/${rfidId}`,
        payload
      );
      console.log("Update sukses:", res.data);
      return res.data;
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      throw err;
    }
  };

  const handleSave = async () => {
    try {
      await updateRfidStatus(selected.id, selected.status);
      onSave?.(); // refresh parent table
      onClose?.();
    } catch (err) {
      // bisa tampilkan error di UI kalau mau
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

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            Nama Siswa
          </label>
          <input
            value={selected.student.name}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 text-[14px] cursor-not-allowed"
          />
        </div>

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            ID Kartu
          </label>
          <input
            value={selected.rfid} // pastikan field-nya memang ini
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 text-[14px] cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[14px] text-gray-600 mb-1">Status</label>
          <select
            value={selected.status}
            onChange={(e) =>
              onDataChange({ ...selected, status: e.target.value })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg text-[14px]"
          >
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>

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
