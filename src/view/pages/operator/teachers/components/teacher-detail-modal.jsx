"use client";

import React, { useState } from "react"; 
import { X } from "lucide-react";

const renderText = (val) => {
  if (!val) return "-";
  if (typeof val === "string" || typeof val === "number") return val;
  if (typeof val === "object") return val.label || val.value || "-";
  return "-";
};

export const DetailModal = ({
  isDetailOpen,
  selectedTeacher,
  setIsDetailOpen,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isDetailOpen || !selectedTeacher) return null;

  const detailItems = [
    { label: "NIP", value: renderText(selectedTeacher.nip) },
    { label: "NIK", value: renderText(selectedTeacher.nik) },
    { label: "Tempat Lahir", value: renderText(selectedTeacher.birth_place) },
    { label: "Tanggal Lahir", value: renderText(selectedTeacher.birth_date) },
    {
      label: "Jenis Kelamin",
      value: renderText(selectedTeacher.gender_label || selectedTeacher.gender),
    },
    { label: "Agama", value: renderText(selectedTeacher.religion?.name) },
    { label: "No Telepon", value: renderText(selectedTeacher.phone_number) },
  ];

  const address = renderText(selectedTeacher.address);
  const CHAR_LIMIT = 60;
  const isLongAddress = address.length > CHAR_LIMIT;
  const displayAddress = isLongAddress && !isExpanded 
    ? `${address.substring(0, CHAR_LIMIT)}...` 
    : address;

  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col mb-3">
      <div className="text-[14px] text-gray-800 break-words">
        <span className="font-medium mr-1">{label} :</span> 
        <span>{value}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[95vh] flex flex-col transition-all overflow-hidden">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-[18px] md:text-[24px] font-semibold text-gray-800">
            Detail Guru
          </h2>
          <button
            onClick={() => {
                setIsDetailOpen(false);
                setIsExpanded(false); 
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start border-b-2 border-[#9CA3AF] gap-6 pb-6 mb-6">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200 border-2 border-[#6B7280] flex-shrink-0">
              {selectedTeacher.image ? (
                <img
                  src={selectedTeacher.image}
                  alt="Foto Guru"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-2 sm:mt-0 sm:pt-2">
              <h3 className="text-[18px] font-semibold text-gray-900">
                {renderText(selectedTeacher.name)}
              </h3>
              <p className="text-[14px] text-gray-600 mt-0.5 break-all sm:break-normal">
                {renderText(selectedTeacher.email)}
              </p>
              <span className="mt-3 text-[12px] font-medium text-white bg-[#3B82F6] py-[3px] px-3 rounded-full">
                Guru
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {detailItems.map((item, index) => (
              <DetailItem key={index} label={item.label} value={item.value} />
            ))}

            <div className="sm:col-span-2 mt-2">
              <div className="text-[14px] text-gray-800 break-words leading-relaxed">
                <span className="font-medium mr-1">Alamat :</span>
                <span>{displayAddress}</span>
                {isLongAddress && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-1 text-blue-600 hover:text-blue-800 font-semibold text-[13px] transition-colors"
                  >
                    {isExpanded ? "Tampilkan sedikit" : "Selengkapnya"}
                  </button>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};