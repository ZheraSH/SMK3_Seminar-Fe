"use client"
import { MoreVertical, Edit3, Trash2, Eye } from "lucide-react"

export default function TeachersTable({
  pageData,
  openMenuId,
  handleToggleMenu,
  handleEditClick,
  handleDelete,
  handleViewDetail, // 👈 Tambahan
}) {
  // 🔹 Helper untuk memastikan gambar tampil dengan URL lengkap
  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-user.png"
    return imagePath.startsWith("http")
      ? imagePath
      : `http://127.0.0.1:8000/${imagePath.replace(/^\/+/, "")}`
  }



  return (
    <div className="mt-8 bg-white rounded-[6px] shadow-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#3B82F6] text-white shadow-md">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Nama</th>
              <th className="text-left px-6 py-4 font-semibold">NIP</th>
              <th className="text-left px-6 py-4 font-semibold">Mapel</th>
              <th className="text-left px-6 py-4 font-semibold">Role</th>
              <th className="text-right px-6 py-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
              pageData.map((row, index) => (
                <tr
                  key={row.id || row.NIP}
                  className={`transition-colors ${
                    index % 2 === 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {/* Nama & Foto */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-300">
                        <img
                          src={resolveImageUrl(row.image)}
                          alt={row.name}
                          onError={(e) => {
                            e.target.src = "/images/default-user.png"
                          }}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-800">
                          {row.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {row.gender}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Kolom lainnya */}
                  <td className="px-6 py-4 text-sm">{row.NIP}</td>
                  <td className="px-6 py-4 text-sm">{row.mapel}</td>
                  <td className="px-6 py-4 text-sm">
                    {Array.isArray(row.roles)
                      ? row.roles.map(r => r.label).join(", ")
                      : (row.roles?.label ?? row.roles ?? "-")}
                  </td>


                  {/* Tombol Aksi */}
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleMenu(row.id)
                      }}
                      className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors menu-button"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === row.id && (
                      <div className="absolute right-10 top-2 w-40 bg-white rounded-lg shadow-2xl border border-gray-200 z-30 overflow-hidden origin-top-right animate-in fade-in-0 zoom-in-95">
                        {/* DETAIL */}
                        <button
                          onClick={() => {
                            handleViewDetail(row)
                            handleToggleMenu(null)
                          }}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-blue-50 text-blue-600"
                        >
                          <Eye className="w-4 h-4" /> Detail
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() => {
                            handleEditClick(row.id)
                            handleToggleMenu(null)
                          }}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-yellow-50 text-yellow-600"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>

                        {/* HAPUS */}
                        <button
                          onClick={() => {
                            handleDelete(row.id)
                            handleToggleMenu(null)
                          }}
                          className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  Tidak ada data Guru yang cocok dengan kriteria pencarian atau
                  filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
