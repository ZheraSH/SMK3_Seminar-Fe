import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, lastPage, totalItems, perPage, onPageChange, isLoading }) {
    if (lastPage <= 1) {
        return null;
    }

    const generatePageNumbers = () => {
        const pages = [];
        const range = 1;

        if (lastPage <= 4) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - range);
            let end = Math.min(lastPage - 1, currentPage + range);

            if (currentPage <= 3) {
                end = Math.min(lastPage - 1, 3);
            }
            
            if (currentPage >= lastPage - 2) {
                start = Math.max(2, lastPage - 3);
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < lastPage - 1) {
                pages.push('...');
            }

            pages.push(lastPage);
        }
        return pages;
    };

    const pageNumbers = generatePageNumbers();
    
    const basePageStyle = "w-10 h-10 flex items-center justify-center font-bold text-sm rounded-xl transition-all duration-150"; 
    const activeStyle = "bg-[#3B82F6] text-white shadow-lg shadow-blue-200 ring-2 ring-blue-100"; 
    const defaultStyle = "text-[#3B82F6] bg-blue-50/50 hover:bg-blue-100 border border-transparent";
    const ellipsisStyle = "flex items-center justify-center text-[#3B82F6] w-10 font-bold";
    const chevronStyle = "p-2 text-[#3B82F6] disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-blue-50 rounded-xl transition-all";

    return (
        <div className="flex items-center justify-center px-4 py-3 w-full font-sans">
            <div className="flex items-center space-x-2">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading} className={chevronStyle}>
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </button>

                <div className="flex space-x-1">
                    {pageNumbers.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`dots-${index}`} className={ellipsisStyle}>
                                    ...
                                </span>
                            );
                        }

                        const isActive = page === currentPage;
                        return (
                            <button 
                                key={index} 
                                onClick={() => onPageChange(page)} 
                                disabled={isLoading}
                                className={`${basePageStyle} ${isActive ? activeStyle : defaultStyle}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastPage || isLoading} className={chevronStyle}>
                    <ChevronRight size={24} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}

export default Pagination;

