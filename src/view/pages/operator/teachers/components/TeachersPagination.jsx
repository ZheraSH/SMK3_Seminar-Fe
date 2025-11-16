import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6 items-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-100"
      >
        &lt;
      </button>

      <span className="text-white font-light bg-blue-600 px-3 py-1 rounded">
        {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-100"
      >
        &gt;
      </button>
    </div>
  );
};
