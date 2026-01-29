"use client"

import React from "react";

export function PaginationAbsenceStudent({ currentPage, totalPages, onPageChange }) {
    const finalTotalPages = totalPages < 1 ? 1 : totalPages;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= finalTotalPages) {
            onPageChange(page);
        }
    }

    // Selalu render pagination, walaupun 1 page
    // if (finalTotalPages <= 1 && totalPages > 0) return null; // hapus

    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 text-blue-600 transition duration-150"
                    }`}
            >
                &lt;
            </button>

            {Array.from({ length: finalTotalPages }, (_, i) => i + 1)
                .filter(
                    (page) =>
                        page === 1 ||
                        page === finalTotalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .map((page, i, arr) => (
                    <React.Fragment key={page}>
                        {i > 0 && arr[i - 1] !== page - 1 && (
                            <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-md transition duration-150 ${page === currentPage
                                    ? "bg-blue-600 text-white border-blue-600 font-medium shadow-md"
                                    : "hover:bg-blue-50 text-blue-600 font-medium border border-transparent hover:border-blue-200"
                                }`}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === finalTotalPages}
                className={`px-3 py-1 rounded-md ${currentPage === finalTotalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 text-blue-600 transition duration-150"
                    }`}
            >
                &gt;
            </button>
        </div>
    );
}
