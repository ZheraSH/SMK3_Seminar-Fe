export default function TableSchedule ({schedule,loading,error}){

    if (loading) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-gray-500 text-sm animate-pulse">Loading jadwal...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-red-500 text-sm">{error}</p>
            </div>
        );
    }

    if (!schedule || schedule.length === 0) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-gray-500 text-sm">Tidak ada jadwal hari ini.</p>
            </div>
        );
    }
    return (
        <table className="w-full table-auto border-collapse min-h-[250px] md:h-[283px]">
            <thead>
                <tr className="bg-[#3B82F6] text-white text-[12px] md:text-[14px]">
                    <th className="rounded-tl-md text-left font-medium pl-3 py-2 w-[30%]">Mapel</th>
                    <th className="font-medium text-left w-[25%]">Guru</th>
                    <th className="font-medium text-left w-[20%]">Jam</th>
                    <th className="rounded-tr-md font-medium text-center w-[25%]">Kelas</th>
                </tr>
            </thead>
            <tbody>
                {schedule.map((s,index) => (
                    <tr key={index} className="border border-gray-300  text-[10px] md:text-[12px]  lg:text-[14px]">
                        <td className="pl-3 py-2 font-medium">{s.mata_pelajaran}</td>
                        <td className="font-medium">{s.guru}</td>
                        <td className=" font-medium">{s.penempatan}</td>
                        <td className=" font-medium text-center">{s.classroom || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}