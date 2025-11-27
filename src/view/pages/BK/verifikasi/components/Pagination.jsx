import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';



function Pagination (  {currentPage, lastPage, totalItems, perPage, onPageChange, isLoading} )  {
    const startItem = Math.min((currentPage - 1) * perPage + 1, totalItems);
    const endItem = Math.min(currentPage * perPage, totalItems);

    const generatePageNumbers = () => {
        const pages = [];
        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(lastPage - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            
            if (currentPage < lastPage - 2) pages.push('...');
            if (lastPage !== 1) pages.push(lastPage);
        }
        return [...new Set(pages)]; 
    };
    
    if (totalItems === 0) return null;

    return (
            <div className="flex items-center space-x-1 sm:space-x-2 w-full sm:w-auto justify-center">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className={`p-2 rounded-full transition-colors duration-150 ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex space-x-1">
                    {generatePageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={index} className="px-3 py-1.5 text-gray-500">
                                    ...
                                </span>
                            );
                        }

                        const isActive = page === currentPage;
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                disabled={isLoading}
                                className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-[#3B82F6] text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === lastPage || isLoading}
                    className={`p-2 rounded-full transition-colors duration-150 ${
                        currentPage === lastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
    );
}

export default Pagination;