"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const finalTotalPages = totalPages < 1 ? 1 : totalPages;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= finalTotalPages) {
            onPageChange(page);
        }
    }

    if (finalTotalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const range = 1;

        if (finalTotalPages <= 7) {
            for (let i = 1; i <= finalTotalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - range);
            let end = Math.min(finalTotalPages - 1, currentPage + range);

            if (currentPage <= 2) {
                end = Math.min(finalTotalPages - 1, 3);
            }
            
            if (currentPage >= finalTotalPages - 1) {
                start = Math.max(2, finalTotalPages - 2);
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < finalTotalPages - 1) {
                pages.push('...');
            }

            pages.push(finalTotalPages);
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-8 select-none">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`transition-colors ${currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-500 hover:text-blue-700"
                    }`}
            >
                <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-2 text-blue-500 font-medium">...</span>
                        ) : (
                            <button
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold transition-all ${page === currentPage
                                        ? "bg-blue-500 text-white shadow-sm"
                                        : "text-blue-500 hover:bg-blue-50"
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === finalTotalPages}
                className={`transition-colors ${currentPage === finalTotalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-500 hover:text-blue-700"
                    }`}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}

