"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

export function RfidAddModal({ show, newData, onDataChange, onAdd, onClose }) {
  if (!show) return null;

  const [AddRfids, setAddRfids] = useState([]);

  const addRfid = async () => {
    try {
      const payload = {
        rfid: newData.idCard,
        student_id: newData.studentId,
        status: newData.status,
      };

      const res = await axios.post("http://127.0.0.1:8000/api/rfids", payload);
      console.log("Success:", res.data);

      onAdd?.(); // biar parent refresh
      onClose?.();
    } catch (err) {
      console.error("Error:", err.response?.data || err);
    }
  };

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/students");
        console.log("Data siswa:", res.data.data);
        setStudents(res.data.data);
      } catch (error) {
        console.error("Gagal fetch students:", error);
      }
    };
    fetchStudents();
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

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">
            Pengguna
          </label>
          <select
            value={newData.studentId}
            onChange={(e) =>
              onDataChange({ ...newData, studentId: e.target.value })
            }
            className="w-full border border-gray-400 px-3 py-2 rounded-lg text-[12px]"
          >
            <option value="">-- Pilih Siswa --</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.nisn})
              </option>
            ))}
          </select>
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
            <option value="active">Aktif</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={addRfid}
            className="bg-[#3B82F6] text-white text-[14px] px-4 py-2 h-[37px] w-[90px] rounded-[10px] hover:bg-blue-700"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
