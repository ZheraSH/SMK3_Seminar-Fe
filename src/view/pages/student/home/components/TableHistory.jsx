export default function TableHistory ({history,status}) {
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
                    const matchStatus = status.find((s) => s.id === h.status);
                    return (
                        <tr key={index} className="border border-gray-300 h-[50px] md:h-[57px]  text-[10px] md:text-[12px]  lg:text-[14px]">
                            <td className="pl-3  font-medium">{h.date}</td>
                            <td className=" text-center font-medium">{h.reason}</td>
                            <td className="text-center">
                                <span className={`px-2 md:px-3 py-0.5 rounded-md inline-flex justify-center items-center font-medium ${matchStatus?.style}`}>
                                    {h.status}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
