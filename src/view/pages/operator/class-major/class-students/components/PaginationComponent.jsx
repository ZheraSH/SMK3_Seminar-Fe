import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    const generatePageNumbers = () => {
        const pages = [];
        const pagesToShow = 3; 

        let startPage;
        
        if (currentPage === 1) {
            startPage = 1;
        } else if (currentPage === totalPages) {
            startPage = Math.max(1, totalPages - pagesToShow + 1);
        } else {
            startPage = Math.max(1, currentPage - 1);
        }

        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
        
        if (endPage - startPage < pagesToShow - 1 && startPage > 1) {
            startPage = Math.max(1, startPage - (pagesToShow - 1 - (endPage - startPage)));
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();
    const basePageStyle = "w-8 h-8 flex items-center justify-center font-bold text-sm rounded-lg transition-colors duration-150"; 
    const activeStyle = "bg-[#3B82F6] text-white shadow-lg"; 
    const defaultStyle = "bg-white text-[#3B82F6] hover:bg-gray-100";
    const chevronStyle = "p-2 text-[#3B82F6] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100";

    return (
        <div className="flex items-center justify-end space-x-1"> 
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={chevronStyle}>
                <ChevronLeft size={20} />
            </button>
            {pageNumbers.map((page, index) => {
                const isActive = page === currentPage;
                return (
                    <button key={index} onClick={() => onPageChange(page)} className={`${basePageStyle} ${isActive ? activeStyle : defaultStyle}`} aria-current={isActive ? "page" : undefined}>
                        {page}
                    </button>
                );
            })}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={chevronStyle}>
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default PaginationComponent;