"use client";
const MAX_VISIBLE_PAGES = 3;

export function Pagination({ currentPage, totalPages, onPrevious, onNext, onPageClick }) {
  const renderPages = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let p = Math.max(2, currentPage - 1);
      p <= Math.min(totalPages - 1, currentPage + 1);
      p++
    ) {
      if (!pages.includes(p)) {
        pages.push(p);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

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
}
