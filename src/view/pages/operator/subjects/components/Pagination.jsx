"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageClick,
}) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("dots");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("dots");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-2 mt-6 select-none">
      {/* PREV */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`w-9 h-9 flex items-center justify-center rounded-full transition
          ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* PAGES */}
      {pages.map((p, idx) =>
        p === "dots" ? (
          <span key={idx} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageClick(p)}
            className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium transition
              ${
                p === currentPage
                  ? "bg-blue-600 text-white shadow"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* NEXT */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 flex items-center justify-center rounded-full transition
          ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
