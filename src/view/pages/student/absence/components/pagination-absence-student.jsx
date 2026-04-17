"use client"

<<<<<<< HEAD:src/view/pages/BK/monitoring Absen/components/Pagination.jsx
import React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react';


export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null
=======
import React from "react";

export function PaginationAbsenceStudent({ currentPage, totalPages, onPageChange }) {
    const finalTotalPages = totalPages < 1 ? 1 : totalPages;
>>>>>>> dev2:src/view/pages/student/absence/components/pagination-absence-student.jsx

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

<<<<<<< HEAD:src/view/pages/BK/monitoring Absen/components/Pagination.jsx
    let pages = []

    if (totalPages <= 5) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
        if (currentPage <= 3) {
            pages = [1, 2, 3, "...", totalPages]
        } else if (currentPage >= totalPages - 1) {
            pages = [1, "...", totalPages - 1, totalPages]
        } else {
            
            pages = [1, "...", currentPage, currentPage + 1, totalPages]
        }
    }
=======
>>>>>>> dev2:src/view/pages/student/absence/components/pagination-absence-student.jsx

    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none font-sans">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
<<<<<<< HEAD:src/view/pages/BK/monitoring Absen/components/Pagination.jsx
                className={`w-9 h-9 flex items-center justify-center transition ${
                    currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-gray-100 rounded-full"
                }`}
=======
                className={`px-3 py-1 rounded-md ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 text-blue-600 transition duration-150"
                    }`}
>>>>>>> dev2:src/view/pages/student/absence/components/pagination-absence-student.jsx
            >
                <ChevronLeft size={20} />
            </button>

<<<<<<< HEAD:src/view/pages/BK/monitoring Absen/components/Pagination.jsx
            {pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page === "..." ? (
                        <span className="px-1 text-blue-600 font-bold">...</span>
                    ) : (
                        <button
                            onClick={() => handlePageChange(page)}
                            className={`w-[32px] h-[32px] rounded-md flex items-center justify-center transition-all text-sm font-medium ${
                                page === currentPage
                                    ? "bg-blue-500 text-white shadow-md "
                                    : "text-blue-600 hover:bg-blue-50"
                            }`}
=======
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
>>>>>>> dev2:src/view/pages/student/absence/components/pagination-absence-student.jsx
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
<<<<<<< HEAD:src/view/pages/BK/monitoring Absen/components/Pagination.jsx
                disabled={currentPage === totalPages}
                className={`w-9 h-9 flex items-center justify-center transition  ${
                    currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-gray-100 rounded-full"
                }`}
=======
                disabled={currentPage === finalTotalPages}
                className={`px-3 py-1 rounded-md ${currentPage === finalTotalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 text-blue-600 transition duration-150"
                    }`}
>>>>>>> dev2:src/view/pages/student/absence/components/pagination-absence-student.jsx
            >
                <ChevronRight size={20} />
            </button>
        </div>
<<<<<<< HEAD:src/view/pages/BK/monitoring Absen/components/Pagination.jsx
    )
}
=======
    );
}

>>>>>>> dev2:src/view/pages/student/absence/components/pagination-absence-student.jsx
