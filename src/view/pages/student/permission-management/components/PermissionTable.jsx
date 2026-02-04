"use client";

import { getStatusBadgeColor } from "../utils/statusHelpers";

export const PermissionTable = ({ permissions = [], onViewDetail }) => {
  const filteredPermissions = permissions.filter(
    (perm) => perm.status === "approved" || perm.status === "rejected"
  );

  const showEmptyAll = permissions.length === 0;
  const showOnlyPending =
    permissions.length > 0 && filteredPermissions.length === 0;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <table className="w-full">
        <thead className="bg-[#3B82F6] text-white">
          <tr>
            <th className="px-6 py-3 text-center font-medium">Jenis Izin</th>
            <th className="px-6 py-3 text-center font-medium">Tanggal</th>
            <th className="px-6 py-3 text-center font-medium">Status</th>
            <th className="px-6 py-3 text-center font-medium">Verifikator</th>
            <th className="px-6 py-3 text-center font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {showEmptyAll && (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-gray-500 text-sm"
              >
                Belum ada pengajuan izin
              </td>
            </tr>
          )}

          {showOnlyPending && (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-gray-500 text-sm"
              >
                Belum ada izin yang diterima
              </td>
            </tr>
          )}

          {!showEmptyAll &&
            !showOnlyPending &&
            filteredPermissions.map((perm) => (
              <tr key={perm.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-[16px] text-center text-gray-900">
                  {perm.type_label}
                </td>

                <td className="px-6 py-4 text-[16px] text-center font-medium text-gray-600">
                  {perm.start_date}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-[5px] ${getStatusBadgeColor(
                        perm.status
                      )}`}
                    >
                      {perm.status_label}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-[16px] text-center">
                  <span className="text-sm">{perm.counselor?.name || "-"}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onViewDetail(perm)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-[10px] text-[12px] font-medium transition"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
