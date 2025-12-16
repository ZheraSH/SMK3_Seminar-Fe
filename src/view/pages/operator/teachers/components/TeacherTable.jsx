import React, { useRef, useState, useEffect } from "react";
import { Edit3, Trash2, Eye } from "lucide-react";
import { createPortal } from "react-dom";

export const TeacherTable = ({
  currentTeachers,
  openItemId,
  setOpenItemId,
  handleDetail,
  handleEdit,
  handleDelete,
}) => {
  const dropdownRefs = useRef({});
  const btnRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [dropUp, setDropUp] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openItemId &&
        dropdownRefs.current[openItemId] &&
        !dropdownRefs.current[openItemId].contains(e.target) &&
        !btnRefs.current[openItemId]?.contains(e.target)
      ) {
        setOpenItemId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openItemId]);

  const calculateDropdownPos = (btn) => {
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const dropdownHeight = 120; 
    const willDropUp = window.innerHeight - rect.bottom < dropdownHeight;

    setDropUp(willDropUp);

    setDropdownPos({
      left: rect.right - 130,
      top: willDropUp ? rect.top - dropdownHeight : rect.bottom,
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-[#3B82F6] text-white text-sm">
            <th className="px-4 py-3 font-medium text-left border-r border-[#3B82F6]">Foto</th>
            <th className="px-4 py-3 font-medium text-left border-r border-[#3B82F6]">Nama</th>
            <th className="px-4 py-3 font-medium text-left border-r border-[#3B82F6] hidden sm:table-cell">NIP</th>
            <th className="px-4 py-3 font-medium text-left border-r border-[#3B82F6] hidden sm:table-cell">Mapel</th>
            <th className="px-4 py-3 font-medium text-left border-r border-[#3B82F6] hidden md:table-cell">Roles</th>
            <th className="px-4 py-3 text-center font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-800">
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher) => (
              <tr key={teacher.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-center">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="border border-gray-400 rounded-full w-[38px] h-[38px] object-cover"
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-col max-w-[140px]">
                    <span className="font-medium truncate">{teacher.name}</span>
                    <span className="text-[12px] text-gray-600">{teacher.gender}</span>
                  </div>
                </td>

                <td className="px-4 py-3 font-medium hidden sm:table-cell truncate max-w-[140px]">
                  {teacher.NIP}
                </td>

                <td className="px-4 py-3 font-medium hidden sm:table-cell truncate max-w-[160px]">
                  {teacher.subjects?.[0]?.name || "-"}
                </td>

                <td className="px-4 py-3 hidden md:table-cell truncate max-w-[160px]">
                  {Array.isArray(teacher.roles)
                    ? teacher.roles.map((r) => r.label).join(", ")
                    : teacher.roles?.label || teacher.roles?.value || "-"}
                </td>

                {/* DROPDOWN BUTTON */}
                <td
                  className="px-4 py-3 text-center relative whitespace-nowrap"
                >
                  <button
                    ref={(el) => (btnRefs.current[teacher.id] = el)}
                    onClick={(e) => {
                      calculateDropdownPos(e.currentTarget, teacher.id);
                      setOpenItemId(openItemId === teacher.id ? null : teacher.id);
                    }}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                  </button>
                </td>

                {/* PORTAL DROPDOWN */}
                {openItemId === teacher.id &&
                  createPortal(
                    <div
                      ref={(el) => (dropdownRefs.current[teacher.id] = el)}
                      className="absolute w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999]"
                      style={{
                        position: "fixed",
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                      }}
                    >
                      <button
                        onClick={() => {
                          handleDetail(teacher);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4 text-blue-500 mr-2" />
                        Detail
                      </button>

                      <button
                        onClick={() => {
                          handleEdit(teacher);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(teacher.id);
                          setOpenItemId(null);
                        }}
                        className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
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
              <td colSpan="6" className="text-center py-5 text-gray-500">
                Tidak ada data guru
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
