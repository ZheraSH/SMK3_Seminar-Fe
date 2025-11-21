"use client";

export function Pagination({ page, lastPage, onPrev, onNext, onPageClick }) {
  const renderPages = () => {
    let pages = [];

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }
    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < lastPage) {
        pages.push(p);
      }
    }
    if (page < lastPage - 2) {
      pages.push("...");
    }
    if (lastPage > 1) pages.push(lastPage);

    return pages;
  };

  return (
    <div className="flex justify-center mt-6 items-center gap-2">

      {/* PREV */}
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        &lt;
      </button>

      {/* PAGE BUTTONS */}
      {renderPages().map((p, i) => (
        p === "…" ? (
          <span key={i} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageClick(p)}
            className={`px-3 py-1 rounded 
              ${p === page 
                ? "bg-blue-600 text-white" 
                : "text-blue-600 hover:bg-blue-100"
              }`}
          >
            {p}
          </button>
        )
      ))}

      {/* NEXT */}
      <button
        onClick={onNext}
        disabled={page === lastPage}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        &gt;
      </button>

    </div>
  );
}
