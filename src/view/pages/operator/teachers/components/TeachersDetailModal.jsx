"use client"

import React from "react"

export function DetailModal({ isOpen, onClose, Teachers }) {
  if (!isOpen || !Teachers) return null

  return (
    <>
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[700px] px-10 py-8 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Detail Siswa</h2>
        </div>

        {/* Foto Profil */}
        <div className="flex justify-center mb-6">
          {Teachers.image ? (
            <img
              src={`http://127.0.0.1:8000/storage/${Teachers.image}`}
              alt="Foto siswa"
              className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm mb-5"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Isi Detail */}
        <div className="grid grid-cols-2 text-gray-700 text-[15px] gap-y-2 gap-x-40 mb-4">
          <div className="space-y-7">
            <p>
              <span className="font-medium">Nama :</span> {Teachers.name || "-"}
            </p>
            <p>
              <span className="font-medium">Kelas :</span> {Teachers.phone_number || "-"}
            </p>
            <p>
              <span className="font-medium">Agama :</span> {Teachers.religion || "-"}
            </p>
            <p>
              <span className="font-medium">Tanggal Lahir :</span> {Teachers.birth_date || "-"}
            </p>
            <p>
              <span className="font-medium">No Akta :</span> {Teachers.number_akta || "-"}
            </p>
            <p>
              <span className="font-medium">Jumlah Saudara :</span> {Teachers.count_siblings || "-"}
            </p>
          </div>

          <div className="space-y-7">
            <p>
              <span className="font-medium">NISN :</span> {Teachers.nisn || "-"}
            </p>
            <p>
              <span className="font-medium">Jenis Kelamin :</span>{" "}
              {Teachers.gender || "-"}
            </p>
            <p>
              <span className="font-medium">Tempat Lahir :</span> {Teachers.birth_place || "-"}
            </p>
            <p>
              <span className="font-medium">No KK :</span> {Teachers.number_kk || "-"}
            </p>
            <p>
              <span className="font-medium">Anak Ke- :</span> {Teachers.order_child || "-"}
            </p>
          </div>
        </div>

        {/* Alamat */}
        <div className="mt-4 pt-3 text-gray-700 text-[15px]">
          <p>
            <span className="font-medium">Alamat :</span> {Teachers.address || "-"}
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
  )
}