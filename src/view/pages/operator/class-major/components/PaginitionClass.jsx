const Pagination = ({ page, lastPage, onPageChange }) => {

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mt-6 gap-3">

      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`text-gray-400 hover:text-blue-500 transition ${
          page === 1 ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        &lt;
      </button>

      {/* Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition
            ${
              p === page
                ? "bg-blue-600 text-white font-semibold"
                : "text-blue-600 hover:bg-blue-100"
            }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={page === lastPage}
        onClick={() => onPageChange(page + 1)}
        className={`text-blue-600 hover:text-blue-700 transition ${
          page === lastPage ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        &gt;
      </button>
    </div>
  );
};
export default Pagination;