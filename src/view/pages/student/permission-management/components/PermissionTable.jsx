import { getStatusBadgeColor } from "../utils/statusHelpers";

export const PermissionTable = ({ permissions, onViewDetail }) => {
  if (permissions.length === 0) {
    return <div></div>;
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Jenis Izin
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Tanggal
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Bukti</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Verifikator
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {permissions.map((perm) => (
            <tr key={perm.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {perm.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{perm.date}</td>
              <td className="px-6 py-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-[5px] ${getStatusBadgeColor(
                    perm.status
                  )}`}
                >
                  {perm.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-medium">
                  IMG
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {perm.verifier}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetail(perm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition"
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
