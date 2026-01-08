import React, { useState } from "react";
import { Calendar, CircleCheckBig, MoreVertical, Trash2 } from "lucide-react";
import HeaderPage from "../../../components/elements/header/Header.Page";
import { Toaster } from "react-hot-toast";
// import LoadingSpinner from "../../../components/elements/loading/Loading";
import { useSchoolYears } from "../../../../Core/hooks/operator-hooks/schoolyears/useSchoolYears";
import { isValidPage } from "./utils/Pagination";
import LoadingData from "../../../components/Loading/Data";

export default function TahunAjaran() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const {
    data,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchSchoolYears,
    addSchoolYear,
    deleteSchoolYear,
    activateSchoolYear,
  } = useSchoolYears();

  const closeMenu = () => setOpenMenuId(null);

  const handleAddSchoolYear = async () => {
    const success = await addSchoolYear();
    if (success) setModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (isValidPage(page, totalPages)) {
      fetchSchoolYears(page);
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <LoadingData loading={loading} />;
  } 

  return (
    <div className="flex justify-center items-start p-6 relative top-[-30px]">
      <Toaster position="top-right" />

      <div className="w-full max-w-8xl py-8xl">
        <HeaderPage
          h1="Tahun Ajaran"
          p="Kelola daftar tahun ajaran yang tersedia."
        />

        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 mt-4 rounded-xl shadow">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-semibold">Semester saat ini :</span>
            <span className="bg-green-100 text-[#10B981] font-semibold px-3 py-1 rounded-lg text-sm">
              Ganjil
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#3B82F6] text-white rounded-sm mt-3 sm:mt-0 transition p-2"
          >
            + Tambah Tahun Ajaran
          </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
              <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
                Apakah anda ingin menambah tahun ajaran baru?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-15 py-2 hover:bg-[#CCCCCC] bg-[#D1D5DB] text-[#1F2937] rounded-[8px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSchoolYear}
                  className="flex px-15 py-2 hover:bg-[#2563EB] text-white bg-[#3B82F6] rounded-[8px]"
                >
                  {loading ? (
                    <LoadingSpinner size="h-5 w-5" color="text-white" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl shadow-sm transition relative bg-white"
                onMouseLeave={closeMenu}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 text-[#3B82F6] h-12 font-semibold">
                      <div className="flex justify-center items-center rounded-md bg-[#3B82F6] mt-[-15px] w-6 h-6">
                        <Calendar className="text-white w-4 h-4" />
                      </div>
                      <span className="mt-[-15px]">Tahun ajaran</span>

                      {item.active ? (
                        <span className="bg-[#DBFFEE] text-[#22C55E] text-[10px] mt-[-15px] pt-1.5 px-4 py-1 rounded-md ml-20">
                          Aktif
                        </span>
                      ) : (
                        <span className="bg-[#FEE2E2] text-[#EF4444] text-[10px] mt-[-15px] pt-1.5 px-3 py-1 rounded-md ml-16">
                          Nonaktif
                        </span>
                      )}
                    </div>

                    <p className="text-2xl font-bold mt-2 ml-2">
                      Tahun {item.name}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === item.id ? null : item.id)
                    }
                    className="p-2 absolute right-3 top-3"
                  >
                    <MoreVertical />
                  </button>


                  {openMenuId === item.id && (
                    <div className="absolute bg-white shadow-lg rounded-md w-40 right-2 top-12 z-30">
                      <div
                        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          activateSchoolYear(item.id);
                          closeMenu();
                        }}
                      >
                        <CircleCheckBig className="w-6 h-6 mr-3 text-[#22C55E]" />
                        <span className="text-sm">Aktifkan</span>
                      </div>

                      <div
                        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          deleteSchoolYear(item.id);
                          closeMenu();
                        }}
                      >
                        <Trash2 className="w-6 h-6 mr-3 text-[#EF4444]" />
                        <span className="text-sm">Hapus</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              Tidak ada data tahun ajaran
            </div>
          )}
        </div>
        {/* PAGINATION */}
        <div className="flex justify-center items-center mt-8 mb-6">
          <nav className="inline-flex gap-1">
            {/* PREV */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 ${currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
                }`}
            >
              {"<"}
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-50" 
                  }`}
              >
                {page}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 ${currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
                }`}
            >
              {">"}
            </button>
          </nav>
        </div>

      </div>
    </div>
  );
}
