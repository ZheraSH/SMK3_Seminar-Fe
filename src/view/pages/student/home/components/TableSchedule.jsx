export default function TableSchedule ({schedule}){
    return (
        <table className=" w-[635px] h-[283px] border-collapse overflow-hidden">
            <thead>
                <tr className="bg-[#3B82F6] w-[635px] h-[37px] text-white text-[14px] ">
                    <th className=" rounded-tl-md text-left font-medium pl-5"> Mapel </th>
                    <th className=" font-medium text-left"> Guru </th>
                    <th className=" font-medium text-left"> Jam </th>
                    <th className="font-medium text-left rounded-tr-md "> Kelas </th>
                </tr>
            </thead>
            <tbody>
                {schedule.map((s,index) => (
                    <tr key={index} className=" border-2 border-gray-300">
                        <td className="pl-5 text-[14px] font-medium"> {s.mapel} </td>
                        <td className=" text-[14px] font-medium"> {s.teacher} </td>
                        <td className=" text-[14px] font-medium"> Jam Ke {s.time}</td>
                        <td className=" text-left text-[14px] font-medium" > {s.class}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}