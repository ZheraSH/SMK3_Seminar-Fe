import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  User,
} from "lucide-react";
import { teacherDummy } from "@data/DashboardData";
export default function TeachersMain() {

  const [data] = useState(teacherDummy);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");

  const perPage = 7;

  const filtered = data.filter((d) =>
    [d.name, d.nip, d.mapel, d.role, d.gender]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);

  function goPage(n) {
    setPage(Math.min(Math.max(1, n), totalPages));
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-3 py-2 w-[360px]">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="ml-3 outline-none text-sm w-full"
                placeholder="Search ..."
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenCategory(!openCategory)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm"
              >
                <span className="text-sm">{category}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openCategory && (
                <div className="absolute mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-20">
                  <p className="text-sm font-medium px-2 py-1 text-gray-500">
                    Pilih Kategori
                  </p>

                  <button
                    onClick={() => {
                      setCategory("Semua Kategori");
                      setOpenCategory(false);
                    }}
                    className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Show all
                    {category === "Semua Kategori" && (
                      <span className="text-blue-500 font-bold">✔</span>
                    )}
                  </button>

                
                  <div>
                    <button
                      onClick={() =>
                        setOpenSubMenu(openSubMenu === "role" ? "" : "role")
                      }
                      className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Role
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openSubMenu === "role" ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {openSubMenu === "role" && (
                      <div className="ml-5 border-l border-gray-200 pl-3">
                        {["Pengajar", "BK", "Waka Kurikulum", "Wali Kelas"].map(
                          (r) => (
                            <button
                              key={r}
                              onClick={() => {
                                setCategory(`Role: ${r}`);
                                setOpenCategory(false);
                                setOpenSubMenu("");
                              }}
                              className="block w-full text-left text-sm px-3 py-1.5 hover:bg-gray-100 rounded-md"
                            >
                              {r}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                 
                  <div>
                    <button
                      onClick={() =>
                        setOpenSubMenu(
                          openSubMenu === "gender" ? "" : "gender"
                        )
                      }
                      className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Jenis Kelamin
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openSubMenu === "gender" ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {openSubMenu === "gender" && (
                      <div className="ml-5 border-l border-gray-200 pl-3">
                        {["Laki - laki", "Perempuan"].map((g) => (
                          <button
                            key={g}
                            onClick={() => {
                              setCategory(`Gender: ${g}`);
                              setOpenCategory(false);
                              setOpenSubMenu("");
                            }}
                            className="block w-full text-left text-sm px-3 py-1.5 hover:bg-gray-100 rounded-md"
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        setOpenSubMenu(
                          openSubMenu === "mapel" ? "" : "mapel"
                        )
                      }
                      className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Mata Pelajaran
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openSubMenu === "mapel" ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {openSubMenu === "mapel" && (
                      <div className="ml-5 border-l border-gray-200 pl-3">
                        {["Matematika", "Bahasa Indonesia", "IPA", "IPS"].map(
                          (m) => (
                            <button
                              key={m}
                              onClick={() => {
                                setCategory(`Mapel: ${m}`);
                                setOpenCategory(false);
                                setOpenSubMenu("");
                              }}
                              className="block w-full text-left text-sm px-3 py-1.5 hover:bg-gray-100 rounded-md"
                            >
                              {m}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-[10px] shadow">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Tambah Guru</span>
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-300">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-[#2E86FF] text-white">
                <tr>
                  <th className="text-left px-6 py-4 rounded-tl-[10px]">
                    Nama
                  </th>
                  <th className="text-left px-6 py-4">NIP</th>
                  <th className="text-left px-6 py-4">Mapel</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-left px-6 py-4 rounded-tr-[10px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-b-0 border-b-gray-300"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{row.name}</div>
                          <div className="text-xs text-gray-400">
                            {row.gender}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {row.nip}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {row.mapel}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {row.role}
                    </td>
                    <td className="px-6 py-5 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === row.id ? null : row.id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                      {openMenuId === row.id && (
                        <div className="absolute right-6 top-12 w-40 bg-white rounded-md shadow-2xl border border-gray-200 z-10">
                          <button className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-gray-50">
                            <Eye className="w-4 h-4 text-[#0B69FF]" /> Detail
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-gray-50">
                            <Edit3 className="w-4 h-4 text-[#F59E0B]" /> Edit
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-gray-50 text-red-600">
                            <Trash2 className="w-4 h-4" /> Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3 text-blue-600 font-medium">
              <span>Go to Page</span>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => goPage(num)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${
                    page === num
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-blue-400 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-gray-400">...</span>
              <span className="text-blue-600">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goPage(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 border border-blue-400 rounded-[10px] text-blue-600 font-medium transition-all ${
                  page === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-100"
                }`}
              >
                Previous
              </button>

              <button
                onClick={() => goPage(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 bg-blue-600 text-white rounded-[10px] font-medium border border-blue-600 transition-all ${
                  page === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
