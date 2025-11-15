"use client";
import { Pencil, Trash2 } from 'lucide-react';

export function RfidActionMenu({ onEdit, onDelete }) {
  return (
    <div className="absolute right-8 top-2 bg-white rounded-lg shadow-md border border-gray-200 w-32 z-10">
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-gray-50"
      >
        <Pencil size={16} className="text-[#FACC15]" /> Edit
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-gray-50"
      >
        <Trash2 size={16} className="text-red-600" /> Hapus
      </button>
    </div>
  );
}