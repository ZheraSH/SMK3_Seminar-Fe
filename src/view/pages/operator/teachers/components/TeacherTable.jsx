import React, { useRef, useState, useEffect } from "react";
import { Edit3, Trash2, Eye } from "lucide-react";
import { createPortal } from "react-dom";

const ROLE_COLORS = {
  admin: "bg-red-100 text-red-700",
  teacher: "bg-blue-100 text-blue-700",
  homeroom_teacher: "bg-green-100 text-green-700",
  staff_tu: "bg-purple-100 text-purple-700",
  counselor: "bg-orange-100 text-orange-700",
  default: "bg-gray-100 text-gray-700",
};

const getRoleStyle = (role) => {
  if (!role) return ROLE_COLORS.default;

  const key =
    typeof role === "string"
      ? role.toLowerCase()
      : role.value?.toLowerCase() || role.label?.toLowerCase();

  return ROLE_COLORS[key] || ROLE_COLORS.default;
};

export const TeacherTable = ({
  currentTeachers = [],
  startIndex = 0,
  openItemId,
  setOpenItemId,
  handleDetail,
  handleEdit,
  handleDelete,
}) => {
  const dropdownRefs = useRef({});
  const btnRefs = useRef({});
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openItemId &&
        dropdownRefs.current[openItemId] &&
        !dropdownRefs.current[openItemId].contains(e.target) &&
        !btnRefs.current[openItemId]?.contains(e.target)
      ) {
        setOpenItemId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openItemId, setOpenItemId]);

  const calculateDropdownPos = (btn) => {
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const dropdownHeight = 120;
    const dropdownWidth = 130;

    const willDropUp = window.innerHeight - rect.bottom < dropdownHeight;

    setDropdownPos({
      top: willDropUp ? rect.top - dropdownHeight : rect.bottom,
      left: rect.right - dropdownWidth,
    });
  };

  if (!currentTeachers.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <img
          src="../../../../images/null/nullimage.png"
          alt="Data siswa kosong"
          className="w-100 mb-4"
        />
        <p className="text-gray-400 text-sm font-medium text-center">
          Maaf yaaa.. datanya gaada, silahkan klik “Tambah Guru” <br /> buat tambah data Guru!
        </p>
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-[#3B82F6] text-white text-sm font-medium">
            <th className="px-4 py-3 text-left">No</th>
            <th className="px-4 py-3 text-left">Foto</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">
              NIP
            </th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">
              Jenis Kelamin
            </th>
            <th className="px-4 py-3 text-left hidden md:table-cell">
              Roles
            </th>
            <th className="px-4 py-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm font-medium text-gray-800">
          {currentTeachers.map((teacher, index) => (
            <tr
              key={teacher.id}
              className="
                border-t border-blue-200
                even:bg-blue-50
                odd:bg-white
                hover:bg-blue-100/70
                transition
              "
            >
              <td className="px-4 py-3">
                {startIndex + index + 1}
              </td>

              <td className="px-4 py-3">
                <img
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  className="w-[38px] h-[38px] rounded-full object-cover border border-blue-200"
                />
              </td>

              <td className="px-4 py-3">
                <span className="truncate font-medium">
                  {teacher.name}
                </span>
              </td>

              <td className="px-4 py-3 hidden sm:table-cell truncate">
                {teacher.nip || "-"}
              </td>

              <td className="px-4 py-3 hidden sm:table-cell truncate">
                {teacher.gender?.label || "-"}
              </td>

              <td className="px-4 py-3 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(teacher.roles) &&
                    teacher.roles.length ? (
                    teacher.roles.map((role, i) => (
                      <span
                        key={i}
                        className={`px-2 py-[2px] rounded-full text-xs font-medium ${getRoleStyle(
                          role
                        )}`}
                      >
                        {role.label || role.value || role}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </td>

              <td className="px-4 py-3">
                <button
                  ref={(el) =>
                    (btnRefs.current[teacher.id] = el)
                  }
                  onClick={(e) => {
                    calculateDropdownPos(e.currentTarget);
                    setOpenItemId(
                      openItemId === teacher.id
                        ? null
                        : teacher.id
                    );
                  }}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <i className="fa-solid fa-ellipsis-vertical text-lg" />
                </button>
              </td>

              {openItemId === teacher.id &&
                createPortal(
                  <div
                    ref={(el) =>
                    (dropdownRefs.current[teacher.id] =
                      el)
                    }
                    className="w-32 bg-white border border-blue-200 rounded-xl shadow-lg z-[9999]"
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
                      className="flex w-full px-3 py-2 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 text-blue-500 mr-2" />
                      Detail
                    </button>

                    <button
                      onClick={() => {
                        handleEdit(teacher);
                        setOpenItemId(null);
                      }}
                      className="flex w-full px-3 py-2 hover:bg-blue-50"
                    >
                      <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(teacher.id);
                        setOpenItemId(null);
                      }}
                      className="flex w-full px-3 py-2 hover:bg-red-50"
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
};
