export default function TableSchedule ({schedule}){
    return (
        <table className="w-full table-auto border-collapse min-h-[250px] md:h-[283px]">
            <thead>
                <tr className="bg-[#3B82F6] text-white text-[12px] md:text-[14px]">
                    <th className="rounded-tl-md text-left font-medium pl-3 py-2 w-[30%]">Mapel</th>
                    <th className="font-medium text-left w-[25%]">Guru</th>
                    <th className="font-medium text-left w-[20%]">Jam</th>
                    <th className="rounded-tr-md font-medium text-left w-[25%]">Kelas</th>
                </tr>
            </thead>
            <tbody>
                {schedule.map((s,index) => (
                    <tr key={index} className="border border-gray-300  text-[10px] md:text-[12px]  lg:text-[14px]">
                        <td className="pl-3 py-2 font-medium">{s.mapel}</td>
                        <td className="font-medium">{s.teacher}</td>
                        <td className=" font-medium">Jam Ke {s.time}</td>
                        <td className=" font-medium">{s.class}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}