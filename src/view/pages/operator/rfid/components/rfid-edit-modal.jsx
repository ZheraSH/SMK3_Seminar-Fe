"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { LoadingSpinner } from "@elements/loading-button/loading";
import { notify } from "@core/hooks/notification/notify";
import { updateRfid, fetchAvailableStudents, deleteRFID } from "@services/role-operator/rfid/rfid-api";

export default function RfidEditModal({ show, selected, onDataChange, onSave, onClose }) {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({ student_id: "",});

  useEffect(() => {
    if (show && selected) {
      loadStudents();
      setErrors({});
      setFormData({
        student_id: selected.student?.id || "",
      });
    }
  }, [show, selected]);

  const loadStudents = async () => {
    try {
      const data = await fetchAvailableStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!show || !selected) return null;

  const handleSave = async () => {
    setErrors({});
    
    if (formData.student_id === (selected.student?.id || "")) {
       onClose?.();
       return;
    }

    if (!formData.student_id) {
       setErrors({ student_id: "Siswa wajib dipilih" });
       return;
    }

    setLoading(true);
    try {
      if (selected.student) {
        await deleteRFID(selected.id);
      }

      await updateRfid(selected.id, { student_id: formData.student_id });
      
      notify("Data Berhasil Diperbarui");
      onSave?.();
      onClose?.();
    } catch (err) {
      const responseData = err.response?.data;
      const backendErrors = responseData?.errors;
      const backendMessage = responseData?.message;

      if (backendErrors) {
        setErrors({
          student_id: backendErrors.student_id ? backendErrors.student_id[0] : null,
          general: backendErrors.general ? backendErrors.general[0] : null,
        });
      } else if (backendMessage) {
        setErrors({ general: backendMessage });
      } else {
        setErrors({ general: "Terjadi kesalahan yang tidak terduga." });
        notify("Gagal memperbarui data", "error");
      }
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentStudent = selected.student;
  const isCurrentStudentInList = students.some((s) => s.id === currentStudent?.id);
  const displayStudents = currentStudent && !isCurrentStudentInList
    ? [currentStudent, ...students]
    : students;

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[560px] shadow-lg relative border border-gray-200">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={22} />
        </button>

        <h2 className="text-[24px] font-medium mb-4">Edit Pengguna Kartu RFID</h2>

        {errors.general && (
          <p className="text-red-600 text-sm mb-3">{errors.general}</p>
        )}

        <div className="mb-3">
          <label className="block text-[14px] text-gray-600 mb-1">Nama Siswa Baru</label>
          <select value={formData.student_id} onChange={(e) => setFormData({ ...formData, student_id: e.target.value })} className={`w-full px-3 py-2 rounded-lg text-[14px] border ${errors.student_id ? "border-red-500" : "border-gray-400"}`}>
            <option value="">-- Pilih Siswa Baru --</option>
            {displayStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.student_id && (
            <p className="text-red-600 text-xs mt-1">{errors.student_id}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-[14px] text-gray-600 mb-1">ID Kartu</label>
          <input
            value={selected.rfid ?? ""}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100 text-[14px] cursor-not-allowed"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={handleSave} disabled={loading} className={`bg-[#3B82F6] text-white text-[14px] px-4 py-2 h-[37px] rounded-[10px] hover:bg-blue-700 flex items-center justify-center ${loading ? "w-[120px]" : "w-[90px]"}`}>
            {loading ? <LoadingSpinner /> : "Simpan"}
          </button>
        </div>

      </div>
    </div>
  );
}

