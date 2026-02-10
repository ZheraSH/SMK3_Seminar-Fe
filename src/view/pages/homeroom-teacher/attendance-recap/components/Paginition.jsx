import React from 'react';

export function Pagination({ pagination, goToPage }) {
    const page = pagination.current_page || 1;
    const lastPage = pagination.last_page || 1;

    if (lastPage <= 1) return null;

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (lastPage <= 3) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        }

        if (page <= 3) {
            pageNumbers.push(1, 2, 3);
            if (lastPage > 3) pageNumbers.push('...');
            pageNumbers.push(lastPage);
        } 
        else if (page >= lastPage - 2) {
            pageNumbers.push(1);
            if (lastPage > 3) pageNumbers.push('...');
            pageNumbers.push(lastPage - 2, lastPage - 1, lastPage);
        } 
        else {
            pageNumbers.push(1);
            pageNumbers.push('...');
            pageNumbers.push(page - 1, page, page + 1);
            pageNumbers.push('...');
            pageNumbers.push(lastPage);
        }

        return pageNumbers;
    };

    const pageList = getPageNumbers();

    return (
        <div className="flex items-center justify-center mt-8 gap-2 select-none">
            <button disabled={page === 1} onClick={() => goToPage(page - 1)} 
                className={` cursor-pointer w-7 h-7 flex items-center justify-center  transition hover:bg-gray-50 
                    ${page === 1 ? "opacity-50 cursor-not-allowed text-gray-400" : "text-gray-600 hover:border-blue-400"}`}
            >
                <span className="text-2xl">‹</span>
            </button>

            <div className="flex items-center gap-2">
                {pageList.map((p, index) => {
                    if (p === '...') {
                        return (
                            <span key={`dots-${index}`} className="text-gray-400 px-1 font-medium">
                                ...
                            </span>
                        );
                    }

                    return (
                        <button key={p} onClick={() => goToPage(p)} className={` cursor-pointer w-8 h-8 rounded-md flex items-center justify-center transition-all text-sm font-medium  border
                                ${p === page ? "bg-blue-600 text-white border-blue-600 shadow-blue-100" : "bg-gray-100 text-gray-600 border-gray-100 hover:border-blue-400 hover:text-blue-600"}`}>
                            {p}
                        </button>
                    );
                })}
            </div>

            <button disabled={page === lastPage} onClick={() => goToPage(page + 1)} className={`cursor-pointer w-7 h-7 flex items-center justify-center transition hover:bg-gray-50 
                    ${page === lastPage ? "opacity-50 cursor-not-allowed text-gray-400" : "text-gray-600 hover:border-blue-400"}`}>
                <span className="text-2xl">›</span>
            </button>
        </div>
    );
}

export default Pagination;