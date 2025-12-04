
export default function TableHistory ({history,error,loading}) {
    const style = [
      {
          id : "Disetujui",
          style: " bg-[#10B981]/20 text-[#10B981]"
      },
      {
          id:"Ditolak",
          style: "bg-[#FF5E53]/20 text-[#FF5E53]"
      },
      {
          id:"Menunggu",
          style: " bg-[#FACC15]/20 text-[#FACC15]"
      },
    ]

    if (loading) {
        return (
            <div className="w-full h-[200px] flex justify-center items-center">
                <p className="text-gray-500 text-sm animate-pulse">Loading data...</p>
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

    if (!history || history.length === 0) {
        return (
            <div className="w-full min-h-[200px] flex items-center justify-center text-gray-500 text-sm">
                Tidak ada data izin Terbaru.
            </div>
        );
    }

    return (
        <table className="w-full table-auto border-collapse min-h-[200px] md:h-[261px]">
            <thead>
                <tr className="bg-[#3B82F6] h-[37px] text-white text-[12px] md:text-[14px]">
                    <th className="rounded-tl-md text-left font-medium pl-3 py-2 w-[30%]">Tanggal</th>
                    <th className="font-medium text-center w-[40%]">Alasan</th>
                    <th className="rounded-tr-md font-medium text-center w-[30%]">Status</th>
                </tr>
            </thead>
            <tbody>
                {history.map((h,index) => {
                    const matchStatus = style.find((s) => s.id === h.Status);
                    return (
                        <tr key={index} className="border border-gray-300 h-[50px] md:h-[57px]  text-[10px] md:text-[12px]  lg:text-[14px]">
                            <td className="pl-3  font-medium">{h.Tanggal}</td>
                            <td className=" text-center font-medium">{h.Alasan}</td>
                            <td className="text-center">
                                <span className={`px-2 md:px-3 py-0.5 rounded-md inline-flex justify-center items-center font-medium ${matchStatus?.style}`}>
                                    {h.Status}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
