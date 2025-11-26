"use client";

import { getStatusBadgeColor } from "../utils/statusHelpers";

export const PermissionTable = ({ permissions, onViewDetail }) => {
  if (!permissions || permissions.length === 0) return null;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <table className="w-full">
        <thead className="bg-[#3B82F6] text-white">
          <tr>
            <th className="px-6 py-3 text-left font-medium">Jenis Izin</th>
            <th className="px-6 py-3 text-left font-medium">Tanggal</th>
            <th className="px-6 py-3 text-left font-medium">Status</th>
            <th className="px-6 py-3 text-left font-medium">Bukti</th>
            <th className="px-6 py-3 text-left font-medium">Verifikator</th>
            <th className="px-6 py-3 text-left font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {permissions.map((perm) => (
            <tr key={perm.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-[16px] text-gray-900 ">
                {perm.type_label}
              </td>

              <td className="px-6 py-4 text-[16px] font-medium text-gray-600">
                {perm.start_date}
              </td>

              <td className="px-6 py-4 ">
                <span
                  className={`text-xs font-medium px-3 py-1  rounded-[5px] ${getStatusBadgeColor(
                    perm.status
                  )}`}
                >
                  {perm.status_label}
                </span>
              </td>

              <td className="px-6 py-4 text-[16px]">
                <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-medium">
                  IMG
                </span>
              </td>

              <td className="px-6 py-4 text-[16px]">
                <span className="text-sm">
                  {perm.verification_message}
                </span>
              </td>

              <td className="px-6 py-4">
                <button
                  onClick={() => onViewDetail(perm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-[16px] font-medium transition"
                >
                  Lihat Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
