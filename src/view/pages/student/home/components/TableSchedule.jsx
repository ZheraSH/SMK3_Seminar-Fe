import { getBgColorBySubject } from "../../../../../Core/utils/SubjectHelper";

export default function TableSchedule ({schedule,loading,error}){

    

    if (!schedule || schedule.length === 0) {
        return (
            <div className="w-full h-[250px] flex justify-center items-center">
                <p className="text-gray-500 text-sm">Data belum ada.</p>
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
                    <th className="w-[16%] text-left pl-2 py-2 font-semibold  rounded-tl-md">No</th>
                    <th className="w-[40%] text-left pl-2 font-semibold ">Mata Pelajaran</th>
                    <th className="w-[40%] text-left font-semibold ">Guru</th>
                    <th className="w-[30%] text-left pl-5 font-semibold" >Jam</th>
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

                        <td className=" text-center w-[40%] h-[46px] px-2 align-middle overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className={`inline-block text-white px-3 py-0.5 mt-2 rounded-full text-[12px] font-medium shadow-sm max-w-full truncate ${getBgColorBySubject (s.subject)} `}>
                                {s.subject || "-"}
                            </span>
                        </td>
                        <td className="w-[40%] h-[46px] px-2 align-middle overflow-hidden text-ellipsis whitespace-nowrap">
                            {s.teacher}
                        </td>

                        <td className="w-[30%] h-[46px] text-center align-middle">
                            {s.lesson_hour?.name}
                        </td>
                    </tr>

                );
                })}
            </tbody>
        </table>

    );
}