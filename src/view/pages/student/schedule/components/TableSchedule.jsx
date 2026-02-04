
export default function TableSchedule ({scheduleData,loading,error}) {
  if (loading) {
    return (
      <div className="p-4 md:p-8 text-center text-blue-600">
        <p>Memuat data Schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  if (!scheduleData || scheduleData.length === 0) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-gray-500 text-lg">Tidak ada jadwal hari ini.</p>
            </div>
        );
    }
  return (
      <table className="w-full text-sm text-gray-800">
          <thead>
            <tr className="bg-[#3B82F6] text-white text-base">
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">No</th>
              <th className="px-4 py-3 text-center font-light border-r border-[#3B82F6]">Jam</th>
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">Penempatan</th>
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">Mata Pelajaran</th>
              <th className="px-4 py-3 text-left font-light">Guru</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => {
                const isIstirahat = item.penempatan.toLowerCase().includes("istirahat");
                return (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition text-[16px] font-medium"
                  >
                    <td className="px-4 py-3 text-left ">
                      {item.no}.
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`
                          inline-flex items-center justify-center
                          w-[119px] h-[27px]
                          rounded-md font-medium text-sm
                          ${isIstirahat 
                            ? "bg-yellow-200/40 text-yellow-500" 
                            : "bg-emerald-500/20 text-emerald-600"
                          }
                        `}
                      >
                        {item.jam || "-"}
                      </span>
                    </td>
                    {isIstirahat ? (
                      <td
                        colSpan="2"
                        className="px-1 py-3 text-[16px] font-medium text-center pr-15"
                      >
                        {item.penempatan || "-"} 
                      </td>
                    ) : 
                    (
                    <> 
                      <td className="px-4 py-3 text-left">{item.penempatan || "-"}</td>
                      <td className="px-4 py-3  ">{item.mata_pelajaran || "-"}</td>
                      <td className="px-4 py-3">{item.guru || "-"}  </td>
                    </>
                  )}
                  </tr>
                );
              })}
          </tbody>
        </table>
    );
}