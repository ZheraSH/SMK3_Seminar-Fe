"use client"

import React from "react"

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      {/* Tombol Sebelumnya */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-blue-600"
        }`}
      >
        &lt;
      </button>

      {/* Nomor Halaman */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
        .map((page, i, arr) => (
          <React.Fragment key={page}>
            {i > 0 && arr[i - 1] !== page - 1 && <span className="px-2 text-gray-400">...</span>}
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md transition ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600 font-medium"
                  : "hover:bg-gray-100 text-blue-600 font-medium"
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        ))}

      {/* Tombol Berikutnya */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-blue-600"
        }`}
      >
        &gt;
      </button>
    </div>
  )
}