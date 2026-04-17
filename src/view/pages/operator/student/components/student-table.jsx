"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

export function StudentsTable({
  students = [],
  startIndex = 0,
  onDetail,
  onEdit,
  onDelete,
}) {
  const isEmpty = students.length === 0;

  const [openItemId, setOpenItemId] = useState(null);
  const btnRefs = useRef({});
  const dropdownRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isEmpty) return;

    const handler = (e) => {
      if (
        openItemId &&
        dropdownRefs.current[openItemId] &&
        !dropdownRefs.current[openItemId].contains(e.target) &&
        !btnRefs.current[openItemId]?.contains(e.target)
      ) {
        setOpenItemId(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openItemId, isEmpty]);

  const calculatePos = (btnEl) => {
    if (!btnEl) return;

    const rect = btnEl.getBoundingClientRect();
    const dropdownHeight = 140;
    const dropdownWidth = 130;

    const dropUp = window.innerHeight - rect.bottom < dropdownHeight;

    setDropdownPos({
      top: dropUp ? rect.top - dropdownHeight : rect.bottom,
      left: rect.right - dropdownWidth,
    });
  };

  const safeStartIndex = Number.isFinite(startIndex) ? startIndex : 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <img
          src="../../../../images/null/nullimage.png"
          alt="Data siswa kosong"
          className="w-100 mb-4"
        />
        <p className="text-sm font-medium text-center">
          Maaf yaaa.. datanya gaada, silahkan klik “Tambah Siswa” <br /> buat tambah data Siswa!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full w-full text-sm text-gray-700 bg-white">
        <thead>
          <tr className="bg-[#3B82F6] text-white">
            <th className="px-4 py-3 text-left">No</th>
            <th className="px-4 py-3 text-left">Foto</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">NISN</th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">Kelas</th>
            <th className="px-4 py-3 text-left hidden md:table-cell">Tahun Ajaran</th>
            <th className="px-4 py-3 text-left hidden lg:table-cell">RFID</th>
            <th className="px-4 py-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.id}
              className={`border-t border-gray-200 transition
                ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                hover:bg-blue-100`}
            >
              <td className="px-4 py-3 text-left font-medium">
                {safeStartIndex + index + 1}
              </td>

              <td className="px-4 py-3 text-left">
                <img
                  src={student.image || "/placeholder.png"}
                  alt={student.name}
                  className="w-[38px] h-[38px] rounded-full object-cover border border-gray-300"
                />
              </td>

              <td className="px-4 py-3 text-left font-medium">
                {student.name || "-"}
              </td>

              <td className="px-4 py-3 text-left hidden sm:table-cell font-medium">
                {student.nisn || "-"}
              </td>

              <td className="px-4 py-3 text-left hidden sm:table-cell">
                {student.classroom?.name ? (
                  <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-[10px] font-semibold">
                    {student.classroom.name}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-400 text-white text-[10px]">
                    No Class
                  </span>
                )}
              </td>

              <td className="px-4 py-3 text-left hidden md:table-cell">
                {student.classroom?.schoolYear ? (
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[11px] font-bold border border-green-200">
                    {student.classroom.schoolYear}
                  </span>
                ) : (
                  "-"
                )}
              </td>

              <td className="px-4 py-3 text-left hidden lg:table-cell text-xs text-gray-500">
                {student.rfid?.rfid || "-"}
              </td>

              <td className="px-4 py-3 text-left">
                <button
                  ref={(el) => (btnRefs.current[student.id] = el)}
                  onClick={(e) => {
                    calculatePos(e.currentTarget);
                    setOpenItemId(
                      openItemId === student.id ? null : student.id
                    );
                  }}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <i className="fa-solid fa-ellipsis-vertical text-lg" />
                </button>
              </td>

              {openItemId === student.id &&
                createPortal(
                  <div
                    ref={(el) =>
                      (dropdownRefs.current[student.id] = el)
                    }
                    className="fixed z-[9999] w-32 bg-white border border-gray-200 rounded-xl shadow-lg"
                    style={{
                      top: dropdownPos.top,
                      left: dropdownPos.left,
                    }}
                  >
                    <button
                      onClick={() => {
                        onDetail(student);
                        setOpenItemId(null);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 text-blue-500 mr-2" />
                      Detail
                    </button>

                    <button
                      onClick={() => {
                        onEdit(student);
                        setOpenItemId(null);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-blue-50"
                    >
                      <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        onDelete(student.id);
                        setOpenItemId(null);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 mr-2" />
                      Hapus
                    </button>
                  </div>,
                  document.body
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

