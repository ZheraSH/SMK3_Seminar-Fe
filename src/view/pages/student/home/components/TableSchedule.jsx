export default function TableSchedule ({schedule,error}){

    

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

    
    const displayedSchedule = schedule.filter(s => !s.penempatan.toLowerCase().includes("istirahat"));
    
    if (displayedSchedule.length === 0) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-gray-500 text-sm">Tidak ada jadwal yang ditampilkan (istirahat disembunyikan).</p>
            </div>
        );
    }
    
    return (
        <table className="w-full table-fixed border-collapse  rounded-lg">
            <thead className="block">
                <tr className="table w-full table-fixed rounded-t-lg bg-[#3B82F6] h-[37px] text-white text-[12px] md:text-[15px] ">
                <th className="w-[28%] text-left pl-4 font-normal rounded-tl-md">Mapel</th>
                <th className="w-[38%] text-left pl-5 font-normal">Guru</th>
                <th className="w-[18%] text-left pl-2 font-normal">Jam</th>
                {/* <th className="w-[17%] text-center font-normal rounded-tr-md">Kelas</th> */}
                </tr>
            </thead>

            <tbody className={`block max-h-[250px] overflow-y-auto 
                        [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:'none'] 
                        [scrollbar-width:'none']`}>
                {displayedSchedule.map((s, index) => {

                return (
                    <tr
                    key={index}
                    className={`table w-full table-fixed text-[10px] md:text-[15px]  border-b border-x border-gray-200`}
                    >
                    <td className="w-[30%] pl-4 py-3.5">{s.mata_pelajaran}</td>
                    <td className="w-[35%] pl-5 py-3.5">{s.guru}</td>
                    <td className="w-[25%] text-center py-3.5">{s.penempatan}</td>
                    {/* <td className="w-[17%] text-center py-3.5">{s.classroom || "-"}</td> */}
                    </tr>
                );
                })}
            </tbody>
        </table>

    );
}