import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const generatePageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } 
            else if (currentPage > 3 && currentPage < totalPages - 2) {
                pages.push(1, '...', currentPage, '...', totalPages);
            } 
            else {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            }
        }
        return pages;
    };

    const pageNumbers = generatePageNumbers();
    
    const basePageStyle = "w-[28px] h-[28px] flex items-center justify-center font-medium text-sm rounded-sm transition-all duration-150"; 
    const activeStyle = "bg-[#3B82F6] text-white shadow-md"; 
    const defaultStyle = "text-[#3B82F6] hover:bg-gray-100 border border-transparent";
    const ellipsisStyle = " flex items-center justify-center text-[#3B82F6]";
    const chevronStyle = "p-2 text-[#3B82F6] disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 rounded-md transition-colors ";

    return (
        <div className="flex items-center justify-end space-x-2 font-sans"> 
            <button  onClick={() => onPageChange(currentPage - 1)}  disabled={currentPage === 1}  className={chevronStyle}>
                <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

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
                    <button key={index} onClick={() => onPageChange(page)} className={`${basePageStyle} ${isActive ? activeStyle : defaultStyle}`}aria-current={isActive ? "page" : undefined}>
                        {page}
                    </button>
                );
            })}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={chevronStyle}>
                <ChevronRight size={24} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default PaginationComponent;