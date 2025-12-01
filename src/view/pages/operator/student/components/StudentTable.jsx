"use client";

import { useState } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";


export function StudentsTable({
  students,
  startIndex,
  onDetail,
  onEdit,
  onDelete,
}) {
  const [openItemId, setOpenItemId] = useState(null);

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-[800px] w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-[#3B82F6] text-white">
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              No
            </th>
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              Nama
            </th>
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              NISN
            </th>
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              Kelas
            </th>
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              Tahun Ajaran
            </th>
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              RFID
            </th>
            <th className="px-4 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-gray-800">
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition text-[14px]"
              >
                <td className="px-4 py-5 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-5 text-center  ">{student.name}</td>
                <td className="px-4 py-5 text-center  ">{student.nisn}</td>
                <td className="px-4 py-5 text-center  ">{student.classroom.name || "-"}</td>
                <td className="px-4 py-5 text-center  ">
                  {student.classroom.schoolyear || "-"}
                </td>

                <td className="px-4 py-3 text-center">
                  {student.rfid ? (
                    <input
                      type="text"
                      value={student.rfid.rfid || "-"}
                      disabled
                      className=" rounded-md px-2 py-1 w-[100px] text-center text-gray-600"
                    />
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>

                <td className="px-4 py-3 text-center relative">
                  <button
                    onClick={() =>
                      setOpenItemId(
                        openItemId === student.id ? null : student.id
                      )
                    }
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                  </button>

                  {openItemId === student.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <button
                        onClick={() => {
                          onDetail(student);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4 text-blue-500 mr-2" />
                        Detail
                      </button>

                      <button
                        onClick={() => {
                          onEdit(student);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          onDelete(student.id);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-500 mr-2" />
                        Hapus
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-5 text-gray-500">
                Tidak ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
