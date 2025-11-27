"use client";

import { getStatusColor } from "../utils/statusHelpers";

// PermissionCard Component
export const PermissionCard = ({ permission, onViewDetail }) => {
  return (
    <div className="ml-3 border border-gray-300 bg-white shadow-lg p-4 rounded-2xl flex-shrink-0 w-[320px]">
      {/* Info utama */}
      <div>
        <h3 className="font-semibold text-gray-900 text-[24px] truncate">
          {permission.type_label}
        </h3>

        <div className="text-[14px] text-gray-600 mt-2 mb-2 flex">
          <div>
            <p className="pb-1">Tanggal Izin: </p>
            <span className="font-semibold text-[13px]">
              {permission.start_date} - {permission.end_date}
            </span>
          </div>
          <div className="ml-9">
            <p className="pb-1">Status :</p>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-[5px] ${getStatusColor(
                permission.status
              )}`}
            >
              {permission.status_label}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(permission)}
        className="bg-blue-600 hover:bg-blue-700 text-white mt-1 py-2 px-4 mt-2 w-full rounded-lg font-medium text-sm transition"
      >
        Lihat Detail
      </button>
    </div>
  );
};

// Parent Component
export default function PermissionList({ permissions, onViewDetail }) {
  return (
    <div className="flex flex-wrap gap-0">
      {permissions.map((permission) => (
        <PermissionCard
          key={permission.id}
          permission={permission}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}
