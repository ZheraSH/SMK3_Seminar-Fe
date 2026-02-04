import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, lastPage, totalItems, perPage, onPageChange, isLoading }) {
    if (lastPage <= 1) return null;

    const generatePageNumbers = () => {
        const pages = [];
        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3, '...', lastPage);
            } else if (currentPage >= lastPage - 1) {
                pages.push(1, '...', lastPage - 2, lastPage - 1, lastPage);
            } else {
                pages.push(1, '...', currentPage, '...', lastPage);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center px-4 py-3 w-full">
            <div className="flex items-center space-x-1 justify-center">
                <button  onClick={() => onPageChange(currentPage - 1)}  disabled={currentPage === 1 || isLoading} className={`p-2 transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#3B82F6] hover:bg-gray-100 rounded-lg'}`}>
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                <div className="flex items-center space-x-2">
                    {generatePageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-[#3B82F6] font-bold">
                                    ...
                                </span>
                            );
                        }

                        const isActive = page === currentPage;
                        return (
                            <button key={page} onClick={() => onPageChange(page)} disabled={isLoading} 
                                className={`w-[28px] h-[28px] text-sm font-bold rounded-sm transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#3B82F6] text-white shadow-md'
                                        : 'text-[#3B82F6]  hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastPage || isLoading} className={`p-2 transition-colors ${ currentPage === lastPage ? 'text-gray-300 cursor-not-allowed' : 'text-[#3B82F6] hover:bg-gray-100 rounded-lg'}`}>
                    <ChevronRight size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}

export default Pagination;