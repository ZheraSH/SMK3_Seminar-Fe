import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination ({currentPage, lastPage, totalItems, perPage, onPageChange, isLoading}) {
    if (lastPage <= 1) {
        return null;
    }

    const startItem = Math.min((currentPage - 1) * perPage + 1, totalItems);
    const endItem = Math.min(currentPage * perPage, totalItems);

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const visibleRange = 1;

        if (lastPage <= maxVisiblePages) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - visibleRange);
            let end = Math.min(lastPage - 1, currentPage + visibleRange);
            if (currentPage < 1 + visibleRange + 1) {
                end = 1 + (visibleRange * 2) + 1;
                if (end >= lastPage) end = lastPage - 1;
            } else if (currentPage > lastPage - visibleRange - 1) {
                start = lastPage - (visibleRange * 2) - 1;
                if (start <= 1) start = 2; 
            }
            
            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                if (i !== 1) {
                    pages.push(i);
                }
            }

            if (end < lastPage - 1) pages.push('...');

            if (lastPage !== 1) pages.push(lastPage);
        }

        return [...new Set(pages)];
    };
    

    return (
        <div className="flex items-center justify-center px-4 py-3 sm:px-6 w-full">
            <div className="flex flex-1 sm:flex-none items-center space-x-1 sm:space-x-2 w-full sm:w-auto justify-center">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading} className={`p-2 rounded-full transition-colors duration-150 ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <ChevronLeft size={20} />
                </button>

                <div className="flex space-x-1">
                    {generatePageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-gray-500 flex items-center justify-center">
                                    ...
                                </span>
                            );
                        }

                        const isActive = page === currentPage;
                        return (
                            <button key={page} onClick={() => onPageChange(page)} disabled={isLoading} className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-[#3B82F6] text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}>
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastPage || isLoading} className={`p-2 rounded-full transition-colors duration-150 ${
                        currentPage === lastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

export default Pagination;