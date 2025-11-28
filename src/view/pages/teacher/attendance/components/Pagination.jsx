"use client"

export default function Pagination({page,setPage,pagination }) {
    

    return (
        <div className="flex justify-center items-center gap-2 mt-6 select-none">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded-md ${
              page === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-blue-600"
            }`}
          >
            &lt;
          </button>

          <span className={`px-3 py-1 rounded-md transition ${
            page === pagination.current_page
              ? "bg-blue-600 text-white border-blue-600 font-medium"
              : "hover:bg-gray-100 text-blue-600 font-medium"
          }`}>
            {pagination.current_page} / {pagination.last_page}
          </span>

          <button
            disabled={page >= pagination.last_page}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
  )
}