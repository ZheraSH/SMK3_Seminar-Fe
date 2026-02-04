"use client"

import React from "react"

export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    let pages = []

    if (totalPages <= 4) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
        if (currentPage <= 3) {
            pages = [1, 2, 3, "...", totalPages]
        } else if (currentPage >= totalPages - 2) {
            pages = [1, "...", totalPages - 2, totalPages - 1, totalPages]
        } else {
            pages = [1, "...", currentPage, "...", totalPages]
        }
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none">
            {/* Prev */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 text-blue-600"
                }`}
            >
                &lt;
            </button>

            {/* Pages */}
            {pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page === "..." ? (
                        <span className="px-2 text-gray-400">...</span>
                    ) : (
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
                    )}
                </React.Fragment>
            ))}

            {/* Next */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 text-blue-600"
                }`}
            >
                &gt;
            </button>
        </div>
    )
}
