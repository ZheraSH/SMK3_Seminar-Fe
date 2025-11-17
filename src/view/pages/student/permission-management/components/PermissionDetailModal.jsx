import { X } from "lucide-react";
import { getStatusColor } from "../utils/statusHelpers";

export const PermissionDetailModal = ({ isOpen, onClose, permission }) => {
  if (!isOpen || !permission) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Detail Izin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="bg-gray-200 h-32 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500">IMG</span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Jenis Izin
            </h3>
            <p className="text-gray-900 font-medium">{permission.type}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Informasi Siswa
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nama</span>
                <span className="text-gray-900 font-medium">
                  {permission.studentName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kelas</span>
                <span className="text-gray-900 font-medium">
                  {permission.class}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verifikator</span>
                <span className="text-gray-900 font-medium">
                  {permission.verifier}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Informasi Izin</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Mulai</span>
                <span className="text-gray-900 font-medium">
                  {permission.startDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Selesai</span>
                <span className="text-gray-900 font-medium">
                  {permission.endDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium px-2 py-1 rounded text-xs ${getStatusColor(
                    permission.status
                  )}`}
                >
                  {permission.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Alasan</h3>
            <p className="text-sm text-gray-600">{permission.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
