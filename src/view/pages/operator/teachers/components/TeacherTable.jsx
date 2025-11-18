import React from "react";
import { Edit3, Trash2, Eye } from "lucide-react";

export const TeacherTable = ({
  currentTeachers,
  openItemId,
  setOpenItemId,
  handleDetail,
  handleEdit,
  handleDelete,
}) => {
  return (
    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <thead>
        <tr className="bg-[#3B82F6] text-white text-sm">
          <th
            className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]"
            colSpan={2}
          >
            Nama
          </th>
          <th className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]">
            NIP
          </th>
          <th className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]">
            Maple
          </th>
          <th className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]">
            Roles
          </th>
          <th className="px-4 py-3 text-center font-medium">Aksi</th>
        </tr>
      </thead>

      <tbody className="text-sm text-gray-700">
        {currentTeachers.length > 0 ? (
          currentTeachers.map((teacher) => (
            <tr
              key={teacher.id}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="pl-4 py-3 text-center">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="border border-gray-500 rounded-full w-[38px] h-[38px] object-cover"
                />
              </td>
              <td className="py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {teacher.name}
                  </span>
                  <span className="text-gray-600 text-[12px] font-light">
                    {teacher.gender}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3 font-medium">{teacher.NIP}</td>
              <td className="px-4 py-3 font-medium">
                {teacher.subjects?.[0]?.name || "-"}
              </td>

              <td>
                {Array.isArray(teacher.roles)
                  ? teacher.roles.map((r) => r.label).join(", ")
                  : teacher.roles?.label || teacher.roles?.value || "-"}
              </td>

              <td className="px-4 py-3 text-center">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() =>
                      setOpenItemId(
                        openItemId === teacher.id ? null : teacher.id
                      )
                    }
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                  </button>

                  {openItemId === teacher.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <button
                        onClick={() => {
                          handleDetail(teacher);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4 text-blue-500 mr-2" />
                        Detail
                      </button>

                      <button
                        onClick={() => {
                          handleEdit(teacher);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(teacher.id);
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
            <td colSpan="7" className="text-center py-5 text-gray-500">
              Tidak ada data guru
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
