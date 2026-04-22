"use client";

import React from "react";
import { X } from "lucide-react";

const renderText = (val) => {
  if (!val) return "-";
  if (typeof val === "string" || typeof val === "number") return val;
  if (typeof val === "object") return val.label || val.value || "-";
  return "-";
};

export const DetailModal = ({ isOpen, student, onClose }) => {
  if (!isOpen || !student) return null;

  const detailItems = [
    { label: "NISN", value: renderText(student.nisn) },
    { label: "Jenis Kelamin", value: renderText(student.gender_label || student.gender) },
    { label: "Tempat Lahir", value: renderText(student.birth_place) },
    { label: "Tanggal Lahir", value: renderText(student.birth_date) },
    { label: "No KK", value: renderText(student.number_kk) },
    { label: "No Akta", value: renderText(student.number_akta) },
    { label: "Anak Ke-", value: renderText(student.order_child) },
    { label: "Jumlah Saudara", value: renderText(student.count_siblings) },
  ];

  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col mb-3">
      {/* w-64 dihapus agar fleksibel, menggunakan break-words supaya teks panjang tidak hancur */}
      <div className="text-[14px] text-gray-800 break-words">
        <span className="font-medium">{label} :</span> {value}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
      {/* Lebar tetap sama dengan code awal Anda, tapi tinggi dibuat otomatis (auto) */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[90vh] flex flex-col transition-all overflow-hidden">
        
        {/* Header Tetap di Atas */}
        <div className="flex justify-between items-center p-6 shrink-0">
          <h2 className="text-[18px] md:text-[24px] font-semibold text-gray-800">
            Detail Siswa
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Konten dengan Scroll jika layar kekecilan */}
        <div className="overflow-y-auto px-6 pb-8 lg:px-10">
          
          {/* Bagian Foto dan Nama */}
          <div className="flex items-center border-b-2 border-[#9CA3AF] gap-6 pb-6 mb-6 flex-col sm:flex-row">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200 border-2 border-[#6B7280] flex-shrink-0">
              {student.image ? (
                <img
                  src={student.image}
                  alt="Foto Siswa"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="text-[18px] font-semibold text-gray-900">
                {renderText(student.name)}
              </h3>
              <p className="text-[14px] text-gray-600 mt-0.5 break-all">
                {renderText(student.email)}
              </p>
              <span className="mt-2 text-[12px] font-medium text-white bg-[#00C4E6] py-[3px] px-3 rounded-full inline-block">
                {renderText(student.classroom?.name || student.role)}
              </span>
            </div>
          </div>

          {/* Bagian Data Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {detailItems.map((item, index) => (
              <DetailItem
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}

            <div className="sm:col-span-2 mt-3">
              <div className="text-[14px] text-gray-800 break-words leading-relaxed">
                <span className="font-medium">Alamat :</span> {renderText(student.address)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};