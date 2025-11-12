"use client"

export function SubjectModal({ isOpen, mode, subject, onClose, onChange, onSubmit }) {
  if (!isOpen) return null

  const title = mode === "add" ? "Tambah Mapel Baru" : "Edit Mapel"
  const buttonText = mode === "add" ? "Tambah" : "Simpan Perubahan"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Nama Mata Pelajaran</label>
            <input
              type="text"
              placeholder="Masukkan nama mapel"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={subject.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
