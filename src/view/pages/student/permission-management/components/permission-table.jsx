"use client";
import { ShieldPlus, FileText, Clock, ChevronRight } from "lucide-react";
import { getStatusBadgeColor } from "../utils/status-helpers";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const getTypeStyles = (type) => {
  const t = type?.toLowerCase() || "";
  if (t.includes("sakit")) return { icon: <ShieldPlus size={20} />, color: "bg-red-50 text-red-500" };
  if (t.includes("izin")) return { icon: <FileText size={20} />, color: "bg-blue-50 text-blue-500" };
  if (t.includes("dispensasi") || t.includes("dispensi")) return { icon: <Clock size={20} />, color: "bg-orange-50 text-orange-500" };
  return { icon: <FileText size={20} />, color: "bg-gray-50 text-gray-500" };
};

const getStatusStylesMobile = (status) => {
  const s = status?.toLowerCase();
  if (s === "approved" || s === "di setujui") return "bg-green-50 text-green-600 border-green-100";
  if (s === "rejected" || s === "ditolak") return "bg-red-50 text-red-600 border-red-100";
  if (s === "pending" || s === "menunggu") return "bg-yellow-50 text-yellow-600 border-yellow-100";
  return "bg-gray-50 text-gray-600 border-gray-100";
};

export const PermissionTable = ({ permissions = [], onViewDetail }) => {
  const filteredPermissions = permissions.filter(
    (perm) =>
      perm.status.value === "approved" || perm.status.value === "rejected"
  );

  if (permissions.length === 0) return null;
  if (filteredPermissions.length === 0) return null;

  return (
    <>
      <div className="md:hidden space-y-4 px-1">
        {filteredPermissions.map((perm) => {
          const { icon, color } = getTypeStyles(perm.type.label);
          return (
            <div key={perm.id} className="bg-white p-5 rounded-[22px] border border-gray-100 shadow-sm transition-all active:scale-[0.98]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-[15px] ${color} shadow-sm`}>
                    {icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 leading-tight">{perm.type.label}</span>
                    <span className="text-[11px] font-bold text-gray-400 mt-0.5">{formatDate(perm.counselor?.verified_at)}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${getStatusStylesMobile(perm.status.value)}`}>
                  {perm.status?.label}
                </span>
              </div>
              
              <div className="h-[1px] bg-gray-100/60 w-full mb-4"></div>
              
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Verificator</span>
                  <span className="text-xs font-bold text-gray-700 tracking-tight">{perm.counselor?.name || "-"}</span>
                </div>
                <button 
                  onClick={() => onViewDetail(perm)}
                  className="flex items-center gap-1 text-blue-600 font-black text-sm hover:translate-x-1 transition-transform py-1"
                >
                  Lihat Detail <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block rounded-lg overflow-x-auto border border-gray-200">
        <table className="w-full">
          <thead className="bg-[#3B82F6] text-white">
            <tr>
              <th className="px-6 py-3 whitespace-nowrap text-center font-medium">No</th>
              <th className="px-6 py-3 whitespace-nowrap text-center font-medium">Jenis Izin</th>
              <th className="px-6 py-3 whitespace-nowrap text-center font-medium">Tanggal</th>
              <th className="px-6 py-3 whitespace-nowrap text-center font-medium">Status</th>
              <th className="px-6 py-3 whitespace-nowrap text-center font-medium">Verifikator</th>
              <th className="px-6 py-3 whitespace-nowrap text-center font-medium">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredPermissions.map((perm, index) => (
              <tr
                key={perm.id}
                className={index % 2 === 1 ? "bg-[#EFF6FF]" : "bg-white"}
              >
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {perm.type.label || "kosong"}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {formatDate(perm.counselor?.verified_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-[5px] ${getStatusBadgeColor(
                        perm.status.value
                      )}`}
                    >
                      {perm.status?.label}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {perm.counselor?.name || "-"}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button
                    onClick={() => onViewDetail(perm)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-[10px] text-[12px] font-medium"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

