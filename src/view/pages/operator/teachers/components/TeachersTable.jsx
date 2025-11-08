"use client";

import { useState } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";

export function TeachersTable({
  Teachers,
  startIndex,
  onDetail,
  onEdit,
  onDelete,
}) {
  const [openItemId, setOpenItemId] = useState(null);

  return (
    <>
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-[#3B82F6] text-white text-sm">
            <th className="px-4 py-5 text-left font-semibold border-r border-[#3B82F6] row-end-2">
              Nama
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              NIP
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              Maple
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              Role
            </th>
            <th className="px-4 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {Teachers.length > 0 ? (
            Teachers.map((Teachers, index) => (
              <tr
                key={Teachers.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition text-black font-medium text-[14px] "
              >
                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        Teachers.image ||
                        "/admin_assets/dist/image/pt/teacher.png"
                      }
                      alt={Teachers.name}
                      className="w-[38px] h-[38px] rounded-full object-cover border border-gray-300"
                    />
                    <div>
                      <div className="font-medium">{Teachers.name}</div>
                      <p className="text-[12px] font-extralight text-gray-500">
                        {Teachers.gender}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">{Teachers.NIP}</td>
                <td className="px-4 py-5">{Teachers.maple} - </td>
                <td className="px-4 py-5"> {Teachers.roles[0]?.label} </td>

                

                <td className="px-4 py-3 text-center">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenItemId(
                          openItemId === Teachers.id ? null : Teachers.id
                        )
                      }
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                    </button>

                    {/* Dropdown menu */}
                    {openItemId === Teachers.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                        <button
                          onClick={() => {
                            onDetail(Teachers);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 text-blue-500 mr-2" />
                          Detail
                        </button>

                        <button
                          onClick={() => {
                            onEdit(Teachers);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            onDelete(Teachers.id);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-500 mr-2" />
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-5 text-gray-500">
                Tidak ada data guru
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
