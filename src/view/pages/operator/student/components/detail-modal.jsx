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
    { label: "Jenis Kelamin",  value: renderText(student.gender_label || student.gender), },
    
    { label: "Tempat Lahir", value: renderText(student.birth_place) },
    { label: "Tanggal Lahir", value: renderText(student.birth_date) },
    { label: "No KK", value: renderText(student.number_kk) },
    { label: "No Akta", value: renderText(student.number_akta) },
    { label: "Anak Ke-", value: renderText(student.order_child) },
    {
      label: "Jumlah Saudara",
      value: renderText(student.count_siblings),
    },
  ];

  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-start w-64">
        <span className="text-[14px] text-gray-800 flex gap-1">
          <p className="font-medium">{label} :</p> {value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl lg:w-[600px] md:w-[600px] w-full lg:h-[545px] md:h-[545px] h-[635px] -mt-10 transition-all">

        <div className="flex justify-between items-center p-6 lg:ml-3 md:ml-3">
          <h2 className="lg:text-[24px] md:text-[24px] text-[18px] font-semibold text-gray-800">
            Detail Siswa
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="lg:ml-10 ml-6 max-h-[80vh] lg:mx-10 mx-6">

          <div className="flex items-center border-b-2 border-[#9CA3AF] gap-6 pb-4 mb-4 flex-col sm:flex-row">
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

            <div className="flex flex-col items-center sm:items-start sm:pt-4">
              <h3 className="text-[18px] font-semibold text-gray-900">
                {renderText(student.name)}
              </h3>
              <p className="text-[14px] text-gray-600 mt-0.5">
                {renderText(student.email)}
              </p>
              <span className="mt-2 text-[12px] font-medium text-white bg-[#00C4E6] py-[3px] px-3 rounded-full">
                {renderText(student.classroom?.name || student.role)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 pt-2">
            {detailItems.map((item, index) => (
              <DetailItem
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}

            <div className="sm:col-span-2 mt-4">
              <span className="text-[14px] text-gray-800 flex gap-1">
                <p className="font-medium">Alamat :</p>
                {renderText(student.address)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
