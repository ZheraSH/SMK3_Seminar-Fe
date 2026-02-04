"use client"

import { createPortal } from "react-dom"

export default function DeleteConfirmModal({
  open,
  message = "Data ini akan dihapus permanen. Apakah Kamu yakin ingin menghapus data ini?",
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Konfirmasi Penghapusan
        </h3>

        <p className="text-sm text-gray-700 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
