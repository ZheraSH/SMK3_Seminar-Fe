"use client";

export function Pagination({ currentPage, totalPages, onPrevious, onNext, onPageClick }) {
  const renderPages = () => {
    const pages = [];

    // Selalu tampilkan halaman 1
    pages.push(1);

    // Tampilkan titik-titik jika halaman aktif jauh dari awal
    if (currentPage > 3) {
      pages.push("...");
    }

    // Tampilkan halaman di sekitar halaman aktif
    for (
      let p = Math.max(2, currentPage - 1);
      p <= Math.min(totalPages - 1, currentPage + 1);
      p++
    ) {
      if (!pages.includes(p)) {
        pages.push(p);
      }
    }

    // Tampilkan titik-titik jika halaman aktif jauh dari akhir
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Selalu tampilkan halaman terakhir
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  // JANGAN TAMPILKAN apapun jika total halaman hanya 1
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 items-center gap-2 mb-5 ">
      {/* Tombol Sebelumnya */}
      <button
        type="button" // Biasakan tambah type button agar tidak trigger form submit
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-2 py-1 text-gray-500 disabled:opacity-30 transition-opacity hover:text-blue-600 disabled:cursor-not-allowed"
      >
        &lt;
      </button>

      {/* Daftar Nomor Halaman */}
      {renderPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}-${i}`} // Gabungan p dan i agar key selalu unik
            type="button"
            onClick={() => onPageClick(p)}
            className={`px-3 py-1 rounded-md transition-all duration-200 ${
              p === currentPage
                ? "bg-blue-600 text-white font-semibold shadow-md"
                : "text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Tombol Selanjutnya */}
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-gray-500 disabled:opacity-30 transition-opacity hover:text-blue-600 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
}