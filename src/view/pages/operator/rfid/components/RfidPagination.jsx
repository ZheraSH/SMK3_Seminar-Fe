"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationRfid({
  page,
  lastPage,
  onPrev,
  onNext,
  onPageClick,
}) {
  if (lastPage <= 1) return null;

  let pages = [];

  if (lastPage <= 4) {
    for (let i = 1; i <= lastPage; i++) pages.push(i);
  } else {
    if (page <= 3) {
      pages = [1, 2, 3, "...", lastPage];
    } else if (page >= lastPage - 2) {
      pages = [1, "...", lastPage - 2, lastPage - 1, lastPage];
    } else {
      pages = [1, "...", page, "...", lastPage];
    }
  }

  const PageButton = ({ p, active }) => {
    if (p === "...") {
      return (
        <span className="w-8 h-8 flex items-center justify-center text-blue-500 cursor-default">
          ...
        </span>
      );
    }

    return (
      <button
        onClick={() => onPageClick(p)}
        className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition
          ${
            active
              ? "bg-blue-600 text-white shadow"
              : "text-blue-600 hover:bg-blue-100"
          }`}
      >
        {p}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 select-none">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={onPrev}
        className={`w-9 h-9 flex items-center justify-center transition rounded-full
          ${
            page === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-600 hover:bg-gray-100"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((p, i) => (
        <PageButton key={i} p={p} active={p === page} />
      ))}

      {/* NEXT */}
      <button
        disabled={page === lastPage}
        onClick={onNext}
        className={`w-9 h-9 flex items-center justify-center transition rounded-full
          ${
            page === lastPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-600 hover:bg-gray-100"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
