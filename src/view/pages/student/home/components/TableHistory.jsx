export default function TableHistory({ history, error }) {
  const style = [
    {
      id: "Disetujui",
      style: "bg-[#10B981]/20 text-[#10B981]",
    },
    {
      id: "Ditolak",
      style: "bg-[#FF5E53]/20 text-[#FF5E53]",
    },
    {
      id: "Menunggu",
      style: "bg-[#FACC15]/20 text-[#FACC15]",
    },
  ];

  const filteredHistory = history?.filter((h) => h.Status !== "Menunggu");

  

  if (error) {
    return (
      <div className="w-full h-[250px] flex justify-center items-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!filteredHistory || filteredHistory.length === 0) {
    return (
      <div className="w-full h-[250px] flex justify-center items-center text-gray-500 text-sm">
        Tidak ada data izin Terbaru.
      </div>
    );
  }

  return (
    <table className="w-full table-fixed border-collapse rounded-lg">
      <thead className="block">
        <tr className="table w-full rounded-t-lg table-fixed bg-[#3B82F6] h-[37px] text-white text-[12px] md:text-[15px] ">
          <th className="w-[30%] text-center font-normal">Tanggal</th>
          <th className="w-[30%] text-center font-normal">Alasan</th>
          <th className="w-[30%] text-center font-normal rounded-tr-md">Status</th>
        </tr>
      </thead>

      <tbody
        className={`block max-h-[250px] overflow-y-auto bg-white
                    [&::-webkit-scrollbar]:hidden 
                    [-ms-overflow-style:'none'] 
                    [scrollbar-width:'none']`}
      >
        {filteredHistory.map((h, index) => {
          const matchStatus = style.find(
            (s) => s.id === h.status_label
          );
          

          return (
            <tr
              key={index}
              className={`table w-full table-fixed text-[10px] md:text-[15px] border-b border-x  border-gray-200`}
            >
              
              <td className="w-[35%] text-center py-3.5">
                {h.start_date}
              </td>
              <td className="w-[30%] text-center py-3.5 px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {h.reason}
              </td>
              <td className="w-[30%] text-center py-3.5">
                <span
                  className={`px-2 py-0.5 rounded-md inline-flex justify-center items-center font-medium ${
                    matchStatus?.style ?? ""
                  }`}
                >
                  {h.status_label}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}