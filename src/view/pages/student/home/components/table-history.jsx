export default function TableHistory({ history, error, loading }) {
  const style = [
    { id: "Disetujui", style: "bg-[#22C55E] text-white" },
    { id: "Ditolak", style: "bg-[#EF4444] text-white" },
    { id: "Menunggu", style: "bg-[#FACC15] text-white" },
  ];

  const filteredHistory = history?.filter(
    (h) => h.Status !== "Menunggu"
  );

  if (loading) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <p className="text-gray-500 text-sm animate-pulse">
          Loading data...
        </p>
      </div>
    );
  }

  if (!filteredHistory || filteredHistory.length === 0) {
    return (
      <div className="w-full min-h-[250px] flex flex-col items-center justify-center p-6 transition-all">

        {/* Container Gambar */}
        <div className="mb-4 transform transition-transform hover:scale-105">
          <img
            src="/images/null/null5.png"
            alt="Data Kosong"
            className="w-26 h-26 md:w-36 md:h-36 object-contain opacity-80"
          />
        </div>

        {/* Konten Teks */}
        <div className="text-center">
          <h3 className="text-sm md:text-base font-bold text-gray-700 tracking-tight">
            Riwayat Belum Ada
          </h3>
          <p className="mt-1 text-[11px] md:text-sm text-gray-400 max-w-[220px] md:max-w-xs mx-auto leading-relaxed">
            Sepertinya belum ada data riwayat yang tersedia untuk saat ini.
          </p>
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }


  return (
    <table className="w-full table-fixed border-collapse rounded-lg">
      <thead className="block">
        <tr className="table w-full table-fixed bg-[#3B82F6] h-[37px] text-white text-[12px] font-semibold rounded-t-md">
          <th className="w-[15%] text-left pl-3 py-2 rounded-tl-md">
            No
          </th>
          <th className="w-[30%] text-left  ">
            Tanggal
          </th>
          <th className="w-[30%] text-left ">
            Alasan
          </th>
          <th className="w-[42%] text-center rounded-tr-md">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="block max-h-[250px] overflow-y-auto">
        {filteredHistory.map((h, index) => {
          const matchStatus = style.find(
            (s) => s.id === h.status?.label
          );
          const rowClassName =
            index % 2 === 0 ? "bg-white" : "bg-[#EFF6FF]";

          return (
            <tr
              key={index}
              className={`${rowClassName} table w-full table-fixed border border-[#000000]/20 text-[10px] md:text-[9px] lg:text-[13px]`}
            >
              <td className="w-[10%] pl-5 py-3.5 font-normal">
                {index + 1}.
              </td>

              <td className="w-[30%] text-center font-normal py-3.5">
                {h.counselor?.verified_at}
              </td>

              <td className="w-[35%] px-[5px] text-left py-3.5 overflow-hidden text-ellipsis whitespace-nowrap">
                {h.reason}
              </td>

              <td className="w-[30%] text-center">
                <span
                  className={`px-4 py-1 rounded-3xl w-[88px] inline-flex justify-center items-center font-medium text-[12px] ${matchStatus?.style ?? ""
                    }`}
                >
                  {h.status?.label}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

