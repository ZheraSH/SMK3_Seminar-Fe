"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";

export function StudentsTable({
  students,
  startIndex,
  onDetail,
  onEdit,
  onDelete,
}) {
  const [openItemId, setOpenItemId] = useState(null);
  const btnRefs = useRef({});
  const dropdownRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [dropUp, setDropUp] = useState(false);

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
    const rect = btnEl.getBoundingClientRect();
    const h = 140;
    const shouldDropUp = window.innerHeight - rect.bottom < h;

    setDropUp(shouldDropUp);
    setDropdownPos({
      left: rect.right - 130,
      top: shouldDropUp ? rect.top - h : rect.bottom,
    });
  };

  const safeStartIndex = Number.isFinite(startIndex) ? startIndex : 0;

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-[800px] w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-[#3B82F6] text-white">
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              No
            </th>
            <th className="px-4 py-3 text-center font-semibold border-r border-[#3B82F6]">
              image
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
                className={`border-t border-blue-100 transition
                  ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  hover:bg-blue-100`}
              >
                <td className="px-4 text-center">
                  {safeStartIndex + index + 1}
                </td>
                <td className="px-4 py-3 text-center">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="mx-auto border border-gray-400 rounded-full w-[38px] h-[38px] object-cover"
                  />
                </td>
                <td className="px-4  text-center  ">{student.name}</td>
                <td className="px-4  text-center  ">{student.nisn}</td>
                <td className="px-4 py-3 text-center">
                  {student.classroom?.name ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
                      {student.classroom.name}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                      No Class !
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  {student.classroom?.schoolyear ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#22C55E] text-white text-xs font-semibold">
                      {student.classroom.schoolyear}
                    </span>
                  ) : (
                    <span className="inline-block text-gray-600 text-xs">
                      -
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  {student.rfid?.rfid ? (
                    <span className="inline-block">
                      {student.rfid.rfid}
                    </span>
                  ) : (
                    <span className="inline-block text-gray-600 text-xs">
                      -
                    </span>
                  )}
                </td>

                <td className="px-4 py-4 text-center relative">
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
                </td>

                {openItemId === student.id &&
                  ((
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
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
                        className="flex items-center w-full px-3 py-2 text-sm hover:bg-blue-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500 mr-2" />
                        Hapus
                      </button>
                    </div>
                  ),
                  //create Portal
                  document.body)}
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
