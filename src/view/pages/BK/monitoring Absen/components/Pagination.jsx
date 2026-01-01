"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react';


export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

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

    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none font-sans">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 flex items-center justify-center transition ${
                    currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-gray-100 rounded-full"
                }`}
            >
                <ChevronLeft size={20} />
            </button>

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
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 flex items-center justify-center transition  ${
                    currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-gray-100 rounded-full"
                }`}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}