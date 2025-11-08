"use client"

import { X, User } from "lucide-react"

export default function TeacherDetail({ showModal, handleCloseModal, teacher }) {
  if (!showModal || !teacher) return null

  // Pastikan data aman (nggak undefined/null)
  const roleName =
    teacher.role?.name || teacher.role_name || teacher.role || "-"
  const religionName =
    teacher.religion?.name || teacher.religion_name || teacher.religion_id || "-"
  const genderName =
    teacher.gender === "L" ? "Laki-laki" : teacher.gender === "P" ? "Perempuan" : "-"
  const subjects =
    teacher.subjects && teacher.subjects.length > 0
      ? teacher.subjects.map((s) => s.name).join(", ")
      : "-"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto border border-gray-200">
        {/* Tombol Close */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border-b">
          {/* Foto */}
          <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
            {teacher.image ? (
              <img
                src={teacher.image}
                alt={teacher.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>

          {/* Info Utama */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              {teacher.name || "-"}
            </h2>
            <p className="text-gray-600">{roleName}</p>
            <p className="text-sm text-gray-500">{teacher.nip || "-"}</p>
          </div>
        </div>

        {/* Detail Info */}
        <div className="p-6 space-y-3 text-gray-700">
          <DetailRow label="Jenis Kelamin" value={genderName} />
          <DetailRow label="Agama" value={religionName} />
          <DetailRow label="Email" value={teacher.email || "-"} />
          <DetailRow label="Nomor Telepon" value={teacher.phone_number || "-"} />
          <DetailRow label="Tempat Lahir" value={teacher.birth_place || "-"} />
          <DetailRow
            label="Tanggal Lahir"
            value={
              teacher.birth_date
                ? teacher.birth_date.split("T")[0]
                : "-"
            }
          />
          <DetailRow label="Alamat" value={teacher.address || "-"} />
          <DetailRow label="Mata Pelajaran" value={subjects} />
        </div>
      </div>
    </div>
  )
}

// Komponen kecil untuk baris detail
function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-2">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  )
}
