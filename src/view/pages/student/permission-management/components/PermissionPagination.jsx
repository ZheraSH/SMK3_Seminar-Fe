"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PaginationPermissionStudent({ page, lastPage, onPrev, onNext, onPageClick }) {
  if (lastPage <= 1) return null;

  const renderPages = () => {
    const pages = [];
    if (lastPage <= 3) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", lastPage);
      } else if (page > 3 && page < lastPage - 2) {
        pages.push(1, "...", page, "...", lastPage);
      } else {
        pages.push(1, "...", lastPage - 2, lastPage - 1, lastPage);
      }
    }
    return pages;
  };

  const basePageStyle = "w-[28px] h-[28px] flex items-center justify-center font-medium text-sm rounded-sm transition-all duration-150"; 
  const activeStyle = "bg-[#3B82F6] text-white shadow-md"; 
  const defaultStyle = "text-[#3B82F6] hover:bg-gray-100 border border-transparent";
  const ellipsisStyle = "flex items-center justify-center text-[#3B82F6] w-[28px]";
  const chevronStyle = "p-2 text-[#3B82F6] disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 rounded-md transition-colors";

  return (
    <div className="flex items-center justify-end space-x-2 font-sans mt-6"> 
      <button onClick={onPrev} disabled={page === 1} className={chevronStyle}>
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <div className="flex items-center space-x-1">
        {renderPages().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className={ellipsisStyle}>
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => onPageClick(p)}
              className={`${basePageStyle} ${p === page ? activeStyle : defaultStyle}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button onClick={onNext} disabled={page === lastPage} className={chevronStyle}>
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
