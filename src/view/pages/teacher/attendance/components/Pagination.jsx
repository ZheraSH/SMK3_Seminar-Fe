"use client"

import React from "react"

export default function Pagination({ page, setPage, pagination }) {
    const currentPage = page
    const totalPages = pagination?.last_page || 1

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber)
        }
    }
    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none">
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
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => 
                    p === 1 || 
                    p === totalPages || 
                    (p >= currentPage - 1 && p <= currentPage + 1)
                )
                .map((p, i, arr) => (
                <React.Fragment key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                    )}

                    <button
                        onClick={() => handlePageChange(p)}
                        className={`px-3 py-1 rounded-md transition ${
                            p === currentPage
                            ? "bg-blue-600 text-white border-blue-600 font-medium"
                            : "hover:bg-gray-100 text-blue-600 font-medium"
                        }`}
                    >
                        {p}
                    </button>
                </React.Fragment>
            ))}
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
