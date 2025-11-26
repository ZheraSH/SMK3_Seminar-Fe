import { X } from "lucide-react";
import { getStatusColor } from "../utils/statusHelpers";

export const PermissionDetailModal = ({ isOpen, onClose, permission }) => {
  if (!isOpen || !permission) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Detail Izin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-2.5 text-sm">
          <img
            src={permission.proof}
            alt="Foto guru"
            className="w-full h-28 rounded-[5px] object-cover border border-gray-300 shadow-sm mb-5 bg-gray-300"
          />
          <p className="text-[16px] font-medium ">Informasi Siswa</p>
          <p>
            <span className="text-[14px]">Nama :</span>{" "}
            <span className="p-5">:</span>
            <span className="p-5">{permission.student.name}</span>
          </p>

          <p>
            <span className="text-[14px]">Kelas :</span>{" "}
            <span className="p-5">:</span>
            <span className="">{permission.kelas || "-"}</span>
          </p>
          <p className="text-[16px] font-medium ">Informasi Izin</p>

          <p>
            <span className="text-[14px]">Jenis Izin :</span>{" "}
            <span className="p-5">:</span>
            <span className="">{permission.type_label}</span>
            
          </p>
          <p>
            <span className="text-[14px]">Tanggal Mulai</span>{" "}
            <span className="p-5">:</span>
            <span className="">{permission.start_date}</span>
          </p>

          <p>
            <span className="text-[14px]">Status :</span>{" "}
            <span className="p-5">:</span>
            <span
              className={`px-2 py-1 rounded text-xs ${getStatusColor(
                permission.status
              )}`}
            >
              {permission.status_label}
            </span>
          </p>

          {permission.reason && (
            <div className="w-full text-[14px] break-words whitespace-normal">
              <p>Alasan :</p>
              {permission.reason}
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-medium transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
