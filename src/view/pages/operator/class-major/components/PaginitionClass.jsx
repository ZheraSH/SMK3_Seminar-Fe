import React from 'react';
const MAX_VISIBLE_PAGES = 3; 

const Pagination = ({ page, lastPage, onPageChange }) => {
    if (lastPage <= 1) {
        return null;
    }
    let startPage, endPage;

    if (lastPage <= MAX_VISIBLE_PAGES) {
        startPage = 1;
        endPage = lastPage;
    } else {
        const half = Math.floor(MAX_VISIBLE_PAGES / 2); 
        
        startPage = page - half;
        endPage = page + half;

        if (startPage < 1) {
            startPage = 1;
            endPage = MAX_VISIBLE_PAGES;
        } 
        
        else if (endPage > lastPage) {
            endPage = lastPage;
            startPage = lastPage - MAX_VISIBLE_PAGES + 1;
        }
    }

    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const PageButton = ({ p, active }) => (
        <button
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition text-sm
              ${
                active
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "text-blue-600 hover:bg-blue-100 "
              }`}
        >
            {p}
        </button>
    );

    return (
        <div className="flex items-center justify-center mt-8 gap-2 select-none">

            <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className={`w-8 h-8 flex items-center justify-center  ${page === 1 ? "opacity-50 cursor-not-allowed" : "text-gray-600"}`}>
                &lt;
            </button>

            {startPage > 1 && (
                <>
                    <PageButton p={1} active={page === 1} />
                    {startPage > 2 && <span className="text-gray-500 mx-1">...</span>}
                </>
            )}

            {visiblePages.map((p) => (
                <PageButton key={p} p={p} active={p === page} />
            ))}

            {endPage < lastPage && (
                <>
                    {endPage < lastPage - 1 && <span className="text-gray-500 mx-1">...</span>}
                    <PageButton p={lastPage} active={page === lastPage} />
                </>
            )}

            <button disabled={page === lastPage} onClick={() => onPageChange(page + 1)} className={`w-8 h-8 flex items-center justify-center ${page === lastPage ? "opacity-50 cursor-not-allowed" : "text-gray-600"}`}>
                &gt;
            </button>
        </div>
    );
};

export default Pagination;