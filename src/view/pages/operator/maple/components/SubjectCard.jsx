"use client"

import { MoreVertical, Edit3, Trash2 } from "lucide-react"
import { getIconBySubject, getBgColorBySubject } from "../../../../../Core/utils/SubjectHelper"

export function SubjectCard({ subject, onEdit, onDelete, openMenu, setOpenMenu, index }) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-md transition-all duration-200 p-5 w-[250px] flex flex-col justify-between">
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
          <span className="text-[15px] font-medium text-[#446084]">Mata Pelajaran</span>
        </div>

        <button
          onClick={() => setOpenMenu(openMenu === index ? null : index)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <MoreVertical size={25} />
        </button>

        {openMenu === index && (
          <div className="absolute right-4 top-12 bg-white border border-gray-200 shadow-lg rounded-lg w-36 z-10 animate-fadeIn">
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
              onClick={() => onDelete(subject.id)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-red-600"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <h2 className="text-[20px] font-semibold text-gray-900 mt-4">{subject.name}</h2>
    </div>
  )
}
