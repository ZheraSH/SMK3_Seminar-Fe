"use client"

import React from "react"

export function Pagination({ currentPage, totalPages, onPageChange }) {
    // Pastikan totalPages minimal 1 jika tidak ada data sama sekali
    const finalTotalPages = totalPages < 1 ? 1 : totalPages;
    
    const handlePageChange = (page) => {
        // Logika ini sudah benar karena dikontrol oleh lastPage/totalPages dari API
        if (page >= 1 && page <= finalTotalPages) {
            onPageChange(page)
        }
    }
    
    // Jangan tampilkan pagination jika hanya ada 1 halaman total
    if (finalTotalPages <= 1 && totalPages > 0) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none">
            {/* Tombol Sebelumnya */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-blue-600 transition duration-150"
                }`}
            >
                &lt;
            </button>

            {/* Nomor Halaman dan Tombol Titik-titik (...) */}
            {Array.from({ length: finalTotalPages }, (_, i) => i + 1)
                // Filter untuk menampilkan halaman 1, halaman terakhir, dan halaman di sekitar currentPage
                .filter((page) => page === 1 || page === finalTotalPages || (page >= currentPage - 1 && page <= currentPage + 1))
                .map((page, i, arr) => (
                <React.Fragment key={page}>
                    {/* Logika untuk menampilkan "..." jika ada lompatan halaman */}
                    {i > 0 && arr[i - 1] !== page - 1 && <span className="px-2 text-gray-400">...</span>}
                    <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md transition duration-150 ${
                        page === currentPage
                        ? "bg-blue-600 text-white border-blue-600 font-medium shadow-md"
                        : "hover:bg-blue-50 text-blue-600 font-medium border border-transparent hover:border-blue-200"
                    }`}
                    >
                    {page}
                    </button>
                </React.Fragment>
                ))}

            {/* Tombol Berikutnya */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === finalTotalPages}
                className={`px-3 py-1 rounded-md ${
                currentPage === finalTotalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-blue-600 transition duration-150"
                }`}
            >
                &gt;
            </button>
        </div>
    )
}