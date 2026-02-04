"use client";
import { Plus } from "lucide-react";
export function SubjectModal({
  isOpen,
  mode,
  subject,
  errors,
  setErrors,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  const title = mode === "add" ? "Tambah Mapel Baru" : "Edit Mapel";
  const buttonText = mode === "add" ? <div className="flex gap-2 font-medium"><Plus size={20} /> Tambah </div> : "Simpan";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 relative mx-7">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6B7280] hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-[18px] md:text-[24px] font-semibold text-gray-800 mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[14px] font-medium text-black">
              Nama Mata Pelajaran <span className="text-red-500"> * </span>
            </label>
            <input
              type="text"
              placeholder="Nama Mapel"
              className={`w-full border rounded-lg px-3 py-2 mt-1 text-[14px] text-[#374151] focus:outline-none ${errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              value={subject.name}
              onChange={(e) => {
                onChange("name", e.target.value);
                setErrors({}); 
              }}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
