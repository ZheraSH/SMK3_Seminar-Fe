"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { notify } from "../../../../../Core/hooks/notification/notify";

export function RfidAddModal({ show, newData, onDataChange, onAdd, onClose }) {
  if (!show) return null;

  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({}); // <= TAMBAHAN
  const [loading, setLoading] = useState(false); // <= TAMBAHAN

  const addRfid = async () => {
    setErrors({});
    setLoading(true);

    // --- Validasi Frontend ---
    if (!newData.studentId) {
      setErrors({ studentId: "Pilih siswa dulu." });
      setLoading(false);
      return;
    }
    if (!newData.idCard.trim()) {
      setErrors({ idCard: "ID kartu tidak boleh kosong." });
      setLoading(false);
      return;
    }

    try {
      const payload = {
        rfid: newData.idCard,
        student_id: newData.studentId,
      };

      const res = await axios.post("http://127.0.0.1:8000/api/rfids", payload);
      console.log("Success:", res.data);
      notify("Berhasil Menambahkan Rfid")

      onAdd?.();
      onClose?.();
    } catch (err) {
      const backendError = err.response?.data?.errors;

      // --- TAMPILIN ERROR BACKEND KE UI ---
      if (backendError) {
        setErrors(backendError);
      } else {
        setErrors({ general: "Terjadi error tak terduga." });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRfidavailable = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/rfids/available-students"
        );
        
        console.log(res.data);
        setStudents(res.data.data);
      } catch (error) {
        console.error("Gagal fetch students:", error);
      }
    };
    fetchRfidavailable();
  }, []);

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

        {errors.general && (
          <p className="text-red-600 text-sm mb-3">{errors.general}</p>
        )}

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            Pengguna
          </label>
          <select
            value={newData.studentId}
            onChange={(e) =>
              onDataChange({ ...newData, studentId: e.target.value })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg text-[14px]"
          >
            <option value="">-- Pilih Siswa --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.nisn})
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="text-red-600 text-xs mt-1">{errors.studentId}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            Id Kartu
          </label>
          <input
            type="text"
            placeholder="Masukkan id kartu"
            value={newData.idCard}
            onChange={(e) =>
              onDataChange({ ...newData, idCard: e.target.value })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg placeholder:text-[14px]"
          />
          {errors.idCard && (
            <p className="text-red-600 text-xs mt-1">{errors.idCard}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[14px] text-gray-600 mb-1">
            Status Awal
          </label>
          <div className="w-full">
            <input
              readOnly
              placeholder="Auto Aktif"
              className="w-full border border-gray-400 py-3 px-3 rounded-lg text-[14px] bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          {errors.status && (
            <p className="text-red-600 text-xs mt-1">{errors.status}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={addRfid}
            disabled={loading}
            className="bg-[#3B82F6] text-white text-[14px] px-4 py-2 h-[37px] w-[90px] rounded-[10px] hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "..." : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}
