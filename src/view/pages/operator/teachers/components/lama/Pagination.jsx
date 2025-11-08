"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPaginationGroup } from "../utils/pagination"

export default function Pagination({ page, totalPages, goPage }) {
  const paginationGroup = getPaginationGroup(totalPages, page)

  return (
    <div className="flex justify-center items-center px-6 py-4 ">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => goPage(page - 1)}
          disabled={page === 1}
          className={`p-1.5 rounded-full text-gray-500 transition-colors ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 text-gray-700"}`}
          aria-label="Halaman Sebelumnya"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-1.5">
          {paginationGroup.map((p, index) =>
            p === "..." ? (
              <span key={index} className="text-sm text-gray-500 px-1 py-1.5 font-medium">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${p === page ? "bg-blue-600 text-white shadow-md shadow-blue-500/50" : "text-blue-700 hover:bg-blue-100 hover:text-blue-700"}`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => goPage(page + 1)}
          disabled={page === totalPages}
          className={`p-1.5 rounded-full text-gray-500 transition-colors ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 text-gray-700"}`}
          aria-label="Halaman Selanjutnya"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
