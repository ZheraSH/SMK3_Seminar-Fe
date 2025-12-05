"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { notify } from "../../../../../Core/hooks/notification/notify";
import {
  addRfid,
  fetchAvailableStudents,
} from "../../../../../Core/api/role-operator/rfid/RfidApi";

export default function RfidAddModal({
  show,
  newData,
  onDataChange,
  onAdd,
  onClose,
  onSuccess,
}) {
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;

    const load = async () => {
      try {
        const data = await fetchAvailableStudents();
        setStudents(data);
      } catch (err) {
        console.error("Gagal fetch students:", err);
      }
    };

    load();
  }, [show]);

  if (!show) return null;

  const handleAdd = async () => {
    setErrors({});
    setLoading(true);

    // VALIDASI FRONTEND
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
      await addRfid({
        rfid: newData.idCard,
        student_id: newData.studentId,
      });

      notify("Data Berhasil Ditambah");

      onAdd?.();
      onSuccess?.();
      onClose?.();
    } catch (err) {
      const backend = err.response?.data?.errors;

      if (backend) {
        setErrors({
          studentId: backend.student_id ? backend.student_id[0] : null,
          idCard: backend.rfid ? backend.rfid[0] : null,
          general: backend.general ? backend.general[0] : null,
        });
      } else {
        setErrors({ general: "Terjadi error tak terduga." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[560px] shadow-lg relative border border-gray-200">

        {/* CLOSE BUTTON */}
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

        {/* STUDENT SELECT */}
        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">Pengguna</label>

          <select
            value={newData.studentId}
            onChange={(e) =>
              onDataChange({ ...newData, studentId: e.target.value })
            }
            className={`w-full px-3 py-2 rounded-lg text-[14px] border ${
              errors.studentId ? "border-red-500" : "border-gray-400"
            }`}
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

        {/* CARD INPUT */}
        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">Id Kartu</label>

          <input
            type="text"
            placeholder="Masukkan id kartu"
            value={newData.idCard}
            onChange={(e) =>
              onDataChange({ ...newData, idCard: e.target.value })
            }
            className={`w-full px-3 py-2 rounded-lg text-[14px] border ${
              errors.idCard ? "border-red-500" : "border-gray-400"
            }`}
          />

          {errors.idCard && (
            <p className="text-red-600 text-xs mt-1">{errors.idCard}</p>
          )}
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <label className="block text-[14px] text-gray-600 mb-1">Status Awal</label>

          <input
            readOnly
            placeholder="Auto Aktif"
            className="w-full border border-gray-400 py-3 px-3 rounded-lg text-[14px] bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-500 text-white text-[14px] px-4 py-2 h-[37px] w-[90px] rounded-[10px] hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "..." : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}
