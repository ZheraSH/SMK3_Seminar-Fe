import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, lastPage, totalItems, perPage, onPageChange, isLoading }) {
    if (lastPage <= 1) {
        return null;
    }

    const generatePageNumbers = () => {
        const pages = [];
        if (lastPage <= 3) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', lastPage);
            } 
            else if (currentPage > 3 && currentPage < lastPage - 2) {
                pages.push(1, '...', currentPage, '...', lastPage);
            } 
            else {
                pages.push(1, '...', lastPage - 2, lastPage - 1, lastPage);
            }
        }
        return pages;
    };

    const pageNumbers = generatePageNumbers();
    
    const basePageStyle = "w-[28px] h-[28px] flex items-center justify-center font-medium text-sm rounded-sm transition-all duration-150"; 
    const activeStyle = "bg-[#3B82F6] text-white shadow-md"; 
    const defaultStyle = "text-[#3B82F6] hover:bg-gray-100 border border-transparent";
    const ellipsisStyle = "flex items-center justify-center text-[#3B82F6] w-[28px]";
    const chevronStyle = "p-2 text-[#3B82F6] disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 rounded-md transition-colors";

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