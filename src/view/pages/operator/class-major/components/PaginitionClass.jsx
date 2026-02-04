import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MAX_VISIBLE_PAGES = 3; 

const Pagination = ({ page, lastPage, onPageChange }) => {
    if (lastPage <= 1) return null;

    let startPage, endPage;

    if (lastPage <= MAX_VISIBLE_PAGES) {
        startPage = 1;
        endPage = lastPage;
    } else {
        if (page <= 2) {
            startPage = 1;
            endPage = MAX_VISIBLE_PAGES;
        } 
        else if (page >= lastPage - 1) {
            startPage = lastPage - MAX_VISIBLE_PAGES + 1;
            endPage = lastPage;
        } 
        else {
            startPage = page - 1;
            endPage = page + 1;
        }
    }

    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const PageButton = ({ p, active }) => (
        <button onClick={() => onPageChange(p)} className={`w-[28px] h-[28px] rounded-sm flex items-center justify-center transition-all text-sm font-bold
              ${active
                ? "bg-[#3B82F6] text-white shadow-sm"
                : "text-[#3B82F6]  hover:bg-gray-100"
              }`}
        >
            {p}
        </button>
    );

    return (
        <div className="flex items-center justify-center mt-8 gap-1 select-none font-sans space-x-2">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className={`w-9 h-9 flex items-center justify-center transition ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-[#3B82F6] hover:bg-gray-50 rounded-lg"}`}>
                <ChevronLeft size={20} />
            </button>

            {startPage > 1 && (
                <>
                    <PageButton p={1} active={page === 1} />
                    {startPage > 2 && <span className="text-[#3B82F6] px-1">...</span>}
                </>
            )}

            {visiblePages.map((p) => (
                <PageButton key={p} p={p} active={p === page} />
            ))}

            {endPage < lastPage && (
                <>
                    {endPage < lastPage - 1 && <span className="text-[#3B82F6] px-1 text-bold">...</span>}
                    <PageButton p={lastPage} active={page === lastPage} />
                </>
            )}

            <button disabled={page === lastPage} onClick={() => onPageChange(page + 1)} className={`w-9 h-9 flex items-center justify-center transition ${page === lastPage ? "text-gray-300 cursor-not-allowed" : "text-[#3B82F6] hover:bg-gray-50 rounded-lg"}`}>
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;