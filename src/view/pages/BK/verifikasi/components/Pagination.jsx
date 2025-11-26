import { ChevronLeft, ChevronRight } from 'lucide-react';



export const Pagination = () => (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50" disabled>
        <ChevronLeft size={20} />
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            page === 1
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <span className="px-2 py-2 text-gray-500">...</span>

      <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
        15
      </button>

      <button className="p-2 text-gray-500 hover:text-blue-600">
        <ChevronRight size={20} />
      </button>
    </div>
  );