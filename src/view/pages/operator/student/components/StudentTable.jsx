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
  const [openItemId, setOpenItemId] = useState(null);
  const btnRefs = useRef({});
  const dropdownRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
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
  }, [openItemId]);

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

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-[900px] w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-[#3B82F6] text-white">
            <th className="px-4 py-3 text-center">No</th>
            <th className="px-4 py-3 text-center">Foto</th>
            <th className="px-4 py-3 text-center">Nama</th>
            <th className="px-4 py-3 text-center">NISN</th>
            <th className="px-4 py-3 text-center">Kelas</th>
            <th className="px-4 py-3 text-center">Tahun Ajaran</th>
            <th className="px-4 py-3 text-center">RFID</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student.id}
                className={`border-t transition border-gray-200
                  ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  hover:bg-blue-100`}
              >
                <td className="px-4 py-3 text-center">
                  {safeStartIndex + index + 1}
                </td>

                <td className="px-4 py-3 text-center">
                  <img
                    src={student.image || "/placeholder.png"}
                    alt={student.name}
                    className="mx-auto w-[38px] h-[38px] rounded-full object-cover border border-gray-300"
                  />
                </td>

                <td className="px-4 py-3 text-center">{student.name || "-"}</td>
                <td className="px-4 py-3 text-center">{student.nisn || "-"}</td>

                <td className="px-4 py-3 text-center">
                  {student.classroom?.name ? (
                    <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
                      {student.classroom.name}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs">
                      No Class
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  {student.classroom?.schoolYear ? (
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      {student.classroom.schoolYear}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  {student.rfid?.rfid || "-"}
                </td>

                <td className="px-4 py-3 text-center">
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

                {/* ===== DROPDOWN (PORTAL) ===== */}
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
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-6 text-gray-500 bg-white"
              >
                Tidak ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
