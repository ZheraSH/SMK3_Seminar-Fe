"use client"

export function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="flex justify-center mt-6 items-center gap-4">
      <button onClick={onPrevious} disabled={currentPage === 1} className="px-3 py-1 rounded disabled:opacity-50">
        &lt;
      </button>

      <span className="text-white font-light bg-blue-600 px-3 py-1 rounded">{currentPage}</span>

      <button onClick={onNext} disabled={currentPage === totalPages} className="disabled:opacity-50">
        &gt;
      </button>
    </div>
  )
}
