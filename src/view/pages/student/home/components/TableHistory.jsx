export default function TableHistory ({history,status}) {
    return (
        <table className=" w-[394px] h-[261px] border-collapse overflow-hidden">
            <thead>
                <tr className="bg-[#3B82F6] w-[635px] h-[37px] text-white text-[14px] ">
                    <th className=" rounded-tl-md text-left font-medium pl-5"> Tanggal </th>
                    <th className=" font-medium text-center"> Alasan </th>
                    <th className="font-medium text-center rounded-tr-md "> Status </th>
                </tr>
            </thead>
            <tbody>
                {history.map((h,index) => {
                    const matchStatus = status.find((s) => s.id === h.status);
                    return (
                        <tr key={index} className=" w-[394px] h-[57px] border-2 border-gray-300">
                            <td className="pl-5 text-[14px] font-medium"> {h.date} </td>
                            <td className=" text-[14px] text-center font-medium"> {h.reason} </td>
                            <td className="text-center text-[14px] ">
                                <span
                                    className={`px-3 py-1 rounded-md inline-flex justify-center items-center text-[14px] font-medium ${matchStatus?.style}`}
                                >
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