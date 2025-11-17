import { PermissionTable } from "./PermissionTable";


export const PermissionTableSection = ({ permissions, onViewDetail }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {permissions.length > 0 && (
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Daftar Riwayat Izin
          </h2>
        )}
      </div>

      <PermissionTable permissions={permissions} onViewDetail={onViewDetail} />
    </div>
  );
};
