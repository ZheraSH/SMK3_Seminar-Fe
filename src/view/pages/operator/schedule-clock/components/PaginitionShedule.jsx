import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, lastPage, onPageChange }) => {
    if (lastPage <= 1) return null;

    let startPage, endPage;
    const MAX_VISIBLE_PAGES = 3;

    if (lastPage <= 5) {
        startPage = 1;
        endPage = lastPage;
    } else {
        if (page <= 2) {
            startPage = 1;
            endPage = 3;
        } else if (page >= lastPage - 1) {
            startPage = lastPage - 2;
            endPage = lastPage;
        } else {
            startPage = page - 1;
            endPage = page + 1;
        }
    }

    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const PageButton = ({ p, active }) => (
        <button onClick={() => onPageChange(p)} className={`w-[28px] h-[28px] rounded-sm flex items-center justify-center transition-all duration-200 text-sm font-bold
              ${active
                ? "bg-[#3B82F6] text-white shadow-md" 
                : "text-[#3B82F6] hover:bg-gray-100"
              }`}
        >
            {p}
        </button>
    );

    return (
        <div className="flex mt-8 items-center justify-center space-x-2 gap-1 select-none font-sans">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className={`w-10 h-10 flex items-center justify-center transition ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-[#3B82F6] hover:bg-gray-50 rounded-lg"}`}>
                <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            {startPage > 1 && (
                <>
                    <PageButton p={1} active={page === 1} />
                    {startPage > 2 && <span className="text-[#3B82F6] font-bold px-1">...</span>}
                </>
            )}

            {visiblePages.map((p) => (
                <PageButton key={p} p={p} active={p === page} />
            ))}

            {endPage < lastPage && (
                <>
                    {endPage < lastPage - 1 && (
                        <span className="text-[#3B82F6] font-bold px-1">...</span>
                    )}
                    <PageButton p={lastPage} active={page === lastPage} />
                </>
            )}

            <button  disabled={page === lastPage}  onClick={() => onPageChange(page + 1)}  className={`w-10 h-10 flex items-center justify-center transition ${page === lastPage ? "text-gray-300 cursor-not-allowed" : "text-[#3B82F6] hover:bg-gray-50 rounded-lg"}`}>
                <ChevronRight size={24} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default Pagination;