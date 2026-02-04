"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { getStatusColor } from "../utils/statusHelpers";

export const PermissionDetailModal = ({ isOpen, onClose, permission }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!isOpen || !permission) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-semibold text-gray-900">
              Detail Izin
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mb-6">
            <span className="font-medium text-[18px]">Bukti Pendukung</span>

            <img
              src={permission.proof}
              alt="Foto bukti"
              onClick={() => setPreviewOpen(true)}
              className="
                w-full h-32 mt-2
                rounded-md object-cover
                border border-gray-300
                bg-gray-200 shadow-sm
                cursor-zoom-in
                hover:scale-[1.02]
                hover:shadow-md
                transition-all duration-300
              "
            />
          </div>

          <div className="mb-5">
            <h3 className="font-medium text-[18px] text-gray-900 mb-2">
              Informasi Siswa
            </h3>
            <DetailRow label="Nama" value={permission.student?.name || "-"} />
            <DetailRow label="Kelas" value={permission.classroom?.name || "-"} />
            <DetailRow
              label="Verifikator"
              value={permission.counselor?.name || "-"}
            />
          </div>

          <div className="mb-5">
            <h3 className="font-medium text-[18px] text-gray-900 mb-2">
              Informasi Izin
            </h3>

            <DetailRow
              label="Jenis Izin"
              value={permission.type?.label || "-"}
            />
            <DetailRow
              label="Tanggal"
              value={permission.date?.start || "-"}
            />
            <DetailRow
              label="Status"
              value={
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    permission.status.value
                  )}`}
                >
                  {permission.status.label}
                </span>
              }
            />

            {permission.reason && (
              <div className="grid grid-cols-[110px_10px_1fr] gap-2 text-sm mt-2">
                <span className="text-gray-700">Alasan</span>
                <span className="text-gray-700">:</span>
                <p className="text-gray-900 whitespace-pre-line break-all">
                  {permission.reason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {previewOpen && (
        <div
          onClick={() => setPreviewOpen(false)}
          className="
            fixed inset-0 z-[999]
            bg-black/70 backdrop-blur-md
            flex items-center justify-center
            animate-fadeIn
          "
        >
          <img
            src={permission.proof}
            alt="Preview bukti"
            className="
              max-w-[90vw] max-h-[90vh]
              rounded-xl shadow-2xl
              animate-zoomIn
            "
          />

          <button
            onClick={() => setPreviewOpen(false)}
            className="
              absolute top-6 right-6
              text-white/80 hover:text-white
              transition
            "
          >
            <X size={28} />
          </button>
        </div>
      )}
    </>
  );
};


const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-[110px_10px_1fr] gap-2 text-sm py-[2px]">
    <span className="text-gray-700">{label}</span>
    <span className="text-gray-700">:</span>
    <span className="text-gray-900 break-words">{value}</span>
  </div>
);
