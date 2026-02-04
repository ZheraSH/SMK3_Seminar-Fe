"use client";

import React from "react";

export function PaginationPermissionStudent({ page, lastPage, onPrev, onNext, onPageClick }) {
  if (!lastPage || lastPage <= 1) return null;

  const renderPages = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) pages.push("...");

    for (let p = Math.max(2, page - 1); p <= Math.min(lastPage - 1, page + 1); p++) {
      if (!pages.includes(p)) pages.push(p);
    }

    if (page < lastPage - 2) pages.push("...");

    if (lastPage > 1 && !pages.includes(lastPage)) pages.push(lastPage);

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
      {renderPages().map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 text-gray-500">
            …
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageClick(p)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            {p}
          </button>
        )
      )}

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
