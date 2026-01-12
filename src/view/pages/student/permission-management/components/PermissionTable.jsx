"use client";

import { getStatusBadgeColor } from "../utils/statusHelpers";

export const PermissionTable = ({ permissions = [], onViewDetail }) => {
  const filteredPermissions = permissions.filter(
    (perm) => perm.status.value === "approved" || perm.status.value === "rejected"
  );

  const isDataEmpty = permissions.length === 0;
  const noProcessedData = permissions.length > 0 && filteredPermissions.length === 0;

  return (
    <div className="rounded-lg overflow-x-auto border border-gray-200">
      <table className="w-full">
        <thead className="bg-[#3B82F6] text-white">
          <tr>
            <th className="px-6 py-3 text-center font-medium">No</th>
            <th className="px-6 py-3 text-center font-medium">Jenis Izin</th>
            <th className="px-6 py-3 text-center font-medium">Tanggal</th>
            <th className="px-6 py-3 text-center font-medium">Status</th>
            <th className="px-6 py-3 text-center font-medium">Verifikator</th>
            <th className="px-6 py-3 text-center font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {isDataEmpty && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500 text-sm">
                Belum ada pengajuan izin
              </td>
            </tr>
          )}

          {noProcessedData && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500 text-sm">
                Belum ada izin yang diterima/ditolak (Semua masih pending)
              </td>
            </tr>
          )}

          {filteredPermissions.map((perm, index) => (
            <tr key={perm.id} className={`${index % 2 === 1 ? 'bg-[#EFF6FF]' : 'bg-white'}`}>
              <td className="px-6 py-4 text-center">{index + 1}</td>
              <td className="px-6 py-4 text-center">{perm.type.label || "kosong"}</td>
              <td className="px-6 py-4 text-center">{perm.counselor?.verified_at || "-"}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <span className={`text-xs font-medium px-3 py-1 rounded-[5px] ${getStatusBadgeColor(perm.status.value)}`}>
                    {perm.status?.label}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm">{perm.counselor?.name || "-"}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <button onClick={() => onViewDetail(perm)} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-[10px] text-[12px] font-medium">
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