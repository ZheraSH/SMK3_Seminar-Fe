import { X } from "lucide-react";
import { getStatusColor } from "../utils/statusHelpers";

export const PermissionDetailModal = ({ isOpen, onClose, permission }) => {
  if (!isOpen || !permission) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Detail Izin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* FOTO */}
        <a href={permission.proof} target="_blank" rel="noopener noreferrer">
          <img
            src={permission.proof}
            alt="Foto bukti"
            className="w-full h-32 rounded-md object-cover border border-gray-300 shadow-sm mb-6 bg-gray-200 hover:opacity-90 transition"
          />
        </a>

        {/* INFORMASI SISWA */}
        <div className="mb-5">
          <h3 className="font-semibold text-gray-900 mb-2">Informasi Siswa</h3>

          <DetailRow label="Nama" value={permission.student.name} />
          <DetailRow label="Kelas" value={permission.classroom.name} />
          <DetailRow
            label="Verifikator"
            value={permission.counselor?.name || "-"}
          />
        </div>

        {/* INFORMASI IZIN */}
        <div className="mb-5">
          <h3 className="font-semibold text-gray-900 mb-2">Informasi Izin</h3>

          <DetailRow label="Jenis Izin" value={permission.type_label} />
          <DetailRow label="Tanggal" value={permission.start_date} />

          <DetailRow
            label="Status"
            value={
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                  permission.status
                )}`}
              >
                {permission.status_label}
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
  );
};

/* ROW 3-KOLOM PERSIS SEPERTI GAMBAR */
const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-[110px_10px_1fr] gap-2 text-sm py-1.5">
    <span className="text-gray-700">{label}</span>
    <span className="text-gray-700">:</span>
    <span className="text-gray-900 break-words">{value}</span>
  </div>
);
