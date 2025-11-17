import { getStatusColor } from "../utils/statusHelpers";

export const PermissionCard = ({ permission, onViewDetail }) => {
  return (
    <div className="w-[340px] bg-white rounded-lg border border-gray-300 p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-gray-900 mb-2 truncate">
        {permission.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        {permission.startDate} - {permission.endDate}
      </p>
      <span
        className={`text-xs font-medium px-3 py-1 rounded-[5px] mb-3 inline-block ${getStatusColor(
          permission.status
        )}`}
      >
        {permission.status}
      </span>
      <button
        onClick={() => onViewDetail(permission)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition"
      >
        Lihat Detail
      </button>
    </div>
  );
};
