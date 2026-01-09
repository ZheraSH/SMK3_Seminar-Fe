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


    const displayedSchedule = schedule.filter(s => !s.lesson_hour?.name.toLowerCase().includes("istirahat"));
    
    if (displayedSchedule.length === 0) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-gray-500 text-sm">Tidak ada jadwal yang ditampilkan (istirahat disembunyikan).</p>
            </div>
        );
    }
    
    return (
        <table className="w-full table-fixed border-collapse  rounded-lg ">
            <thead className="block">
                <tr className="table w-full table-fixed bg-[#3B82F6] h-[40px] text-white text-[12px] font-semibold rounded-t-md">
                <th className="w-[16%] text-left  pl-4  rounded-tl-md">No</th>
                <th className="w-[43%] text-left  ">Mata Pelajaran</th>
                <th className="w-[40%] text-left ">Guru</th>
                <th className="w-[22%] text-left pl-2 " >Jam</th>
                {/* <th className="w-[17%] text-left pl-2 font-normal rounded-tr-md">Kelas</th> */}
                </tr>
            </thead>

            <tbody className={`block max-h-[232px] overflow-y-auto 
                        [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:'none'] 
                        [scrollbar-width:'none']`}>
                {displayedSchedule.map((s, index) => {
                const rowClassName =
                    index % 2 === 0 ? "bg-white" : "bg-[#EFF6FF]";

                return (
                    <tr
                    key={index}
                    className={`${rowClassName} table w-full table-fixed text-[8px] md:text-[10px] lg:text-[14px] border border-[#000000]/20`}
                        >
                        <td className="w-[10%] h-[46px] text-center align-middle">
                            {index + 1}.
                        </td>

                        <td className="w-[34%] h-[46px] pl-2 pr-1 align-middle">
                            <span className="inline-block bg-[#6366F1] text-white px-3 py-0.5 mt-2 rounded-full text-[12px] font-medium shadow-sm max-w-full truncate">
                            {s.subject}
                            </span>
                        </td>

                        <td className="w-[30%] h-[46px] px-2 align-middle overflow-hidden text-ellipsis whitespace-nowrap">
                            {s.teacher}
                        </td>

                        <td className="w-[20%] h-[46px] text-center align-middle">
                            {s.lesson_hour?.name}
                        </td>
                    </tr>

                );
                })}
            </tbody>
        </table>

    );
}