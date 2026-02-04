"use client";

import React from "react";

export function DetailModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-[700px] px-10 py-8 relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Detail Siswa
            </h2>
          </div>

          {/* Foto Profil */}
          <div className="flex justify-center mb-6">
            <img
              src={student.image || "/default-avatar.png"}
              alt="Foto siswa"
              className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm mb-5"
            />
          </div>

          {/* Isi Detail */}
          <div className="grid grid-cols-2 text-gray-700 text-[15px] gap-y-2 gap-x-40 mb-4">
            <div className="space-y-7">
              <p>
                <span className="font-medium">Nama :</span>{" "}
                {student.name || "-"}
              </p>
              <p>
                <span className="font-medium">Kelas :</span>{" "}
                {student.classroom?.name || "-"}
              </p>
              <p>
                <span className="font-medium">Agama :</span>{" "}
                {student.religion?.name || student.religion || "-"}
              </p>
              <p>
                <span className="font-medium">Tanggal Lahir :</span>{" "}
                {student.birth_date || "-"}
              </p>
              <p>
                <span className="font-medium">No Akta :</span>{" "}
                {student.number_akta || "-"}
              </p>
              <p>
                <span className="font-medium">Jumlah Saudara :</span>{" "}
                {student.count_siblings || "-"}
              </p>
            </div>

            <div className="space-y-7">
              <p>
                <span className="font-medium">NISN :</span>{" "}
                {student.nisn || "-"}
              </p>
              <p>
                <span className="font-medium">Jenis Kelamin :</span>{" "}
                {student.gender?.label}
              </p>
              <p>
                <span className="font-medium">Tempat Lahir :</span>{" "}
                {student.birth_place || "-"}
              </p>
              <p>
                <span className="font-medium">No KK :</span>{" "}
                {student.number_kk || "-"}
              </p>
              <p>
                <span className="font-medium">Anak Ke- :</span>{" "}
                {student.order_child || "-"}
              </p>
            </div>
          </div>

          {/* Alamat */}
          <div className="mt-4 pt-3 text-gray-700 text-[15px]">
            <p>
              <span className="font-medium">Alamat :</span>{" "}
              {student.address || "-"}
            </p>
          </div>

          {/* Tombol Tutup */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#3B82F6] text-white rounded-[15px] hover:bg-blue-700 transition-all shadow-md"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
