"use client"

import { MoreVertical, Edit3, Trash2 } from "lucide-react"
import {
  getIconBySubject,
  getBgColorBySubject,
} from "../../../../../Core/utils/SubjectHelper"

export function SubjectCard({
  subject = {},
  onEdit,
  onDelete,
  openMenu,
  setOpenMenu,
}) {
  const id = subject.id

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 p-2 rounded-[12px] flex items-center justify-center ${getBgColorBySubject(
              subject.name,
            )}`}
          >
            {getIconBySubject(subject.name)}
          </div>

          <span className="text-[14px] font-medium text-[#446084]">
            Mata Pelajaran
          </span>
        </div>

        <button
          onClick={() => setOpenMenu(openMenu === id ? null : id)}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <MoreVertical size={20} />
        </button>

        {openMenu === id && (
          <div className="absolute right-3 top-12 bg-white border border-gray-200 shadow-lg rounded-xl w-40 z-20 animate-fadeIn">
            <button
              onClick={() => {
                onEdit(subject)
                setOpenMenu(null)
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-gray-700"
            >
              <Edit3 size={16} /> Edit
            </button>

            <button
              onClick={() => {
                onDelete(id)
                setOpenMenu(null)
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-red-600"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <h2 className="text-[18px] font-semibold text-gray-900 mt-4 break-words">
        {subject.name || "-"}
      </h2>
    </div>
  )
}
