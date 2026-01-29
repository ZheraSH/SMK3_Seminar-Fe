"use client";
import { X } from "lucide-react";
import { getStatusColor } from "../utils/statusHelpers";

const formatDateIndonesia = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

export const PermissionCard = ({ permission, onViewDetail, onDelete }) => {
  return (
    <div className=" border border-gray-300 bg-white shadow-lg h-[166px] p-4 rounded-2xl flex-shrink-0 w-full">
      <div>
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="font-semibold text-gray-900 text-[24px] truncate"> {permission.type.label} </h3>
          </div>
          <div>
            <div onClick={() => onDelete(permission.id)} className="cursor-pointer"><X className="w-5 h-5 text-gray-400 hover:text-red-700" /></div>
          </div>
        </div>
        <div className="text-[14px] text-gray-600 mt-2 mb-2 flex justify-between">
          <div>
            <p className="pb-1 text-[10px]">Tanggal Izin: </p>
            <span className="font-semibold text-[13px]"> {formatDateIndonesia(permission.date.start)} - {formatDateIndonesia(permission.date.end)} </span>
          </div>
          <div>
            <p className="pb-1 text-[10px]">Status :</p>
            <span className={`text-[12px] font-medium px-3 py-1 rounded-[5px] ${getStatusColor(permission.status.value)}`}>
              {permission.status.label}
            </span>
          </div>
        </div>
      </div>

      <button onClick={() => onViewDetail(permission)} className="bg-blue-500 hover:bg-blue-700 text-[14px] text-white mt-1 py-2 px-4 w-full rounded-lg font-medium transition">
        Lihat Detail
      </button>
    </div>
  );
};

export default function PermissionList({ permissions, onViewDetail }) {
  const pendingPermissions = permissions.filter(
    (p) => p.status === "pending"
  );

  if (pendingPermissions.length === 0) {
    return (
      <div className="text-gray-500 text-sm py-6 text-center w-full"> Tidak ada izin pending. </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
      {pendingPermissions.map((permission) => (
        <PermissionCard key={permission.id} permission={permission} onViewDetail={onViewDetail} />
      ))}
    </div>
  );
}
