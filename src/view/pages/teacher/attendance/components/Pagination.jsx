"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, setPage, pagination }) => {
    const lastPage = pagination?.last_page || 1;
    const currentPage = page;

    if (lastPage <= 1) return null;

    let pages = [];

    if (lastPage <= 4) {
        for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
        if (currentPage <= 3) {
            pages = [1, 2, 3, "...", lastPage];
        } else if (currentPage >= lastPage - 2) {
            pages = [1, "...", lastPage - 2, lastPage - 1, lastPage];
        } else {
            pages = [1, "...", currentPage, "...", lastPage];
        }
    }

    const PageButton = ({ p, active }) => (
        <button
            onClick={() => typeof p === 'number' && setPage(p)}
            disabled={p === "..."}
            className={`w-[32px] h-[32px] rounded-md flex items-center justify-center transition-all text-sm font-medium
                ${active
                    ? "bg-[#3B82F6] text-white shadow-md"
                    : p === "..." 
                        ? "text-[#3B82F6] cursor-default" 
                        : "text-[#3B82F6] hover:bg-blue-50"
                }`}
        >
            {p}
        </button>
    );

    return (
        <div className="flex items-center justify-center mt-8 gap-2 select-none font-sans">
            <button
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className={`w-9 h-9 flex items-center justify-center transition ${
                    currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-[#3B82F6] hover:bg-gray-100 rounded-full"
                }`}
            >
                <ChevronLeft size={20} />
            </button>

            {pages.map((p, index) => (
                <PageButton 
                    key={index} 
                    p={p} 
                    active={p === currentPage} 
                />
            ))}

            <button
                disabled={currentPage === lastPage}
                onClick={() => setPage(currentPage + 1)}
                className={`w-9 h-9 flex items-center justify-center transition ${
                    currentPage === lastPage ? "text-gray-300 cursor-not-allowed" : "text-[#3B82F6] hover:bg-gray-100 rounded-full"
                }`}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;