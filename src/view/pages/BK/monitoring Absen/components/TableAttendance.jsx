import { Trash2  } from "lucide-react";

export default function TableAttendanceBk ({students,loading,}) {
    if (loading) {
        return (
        <div className="p-4 md:p-8 text-center text-blue-600">
            <p>Memuat data Absen...</p>
        </div>
        );
    }
    return (
        <table className="w-[1129px] border-collapse overflow-hidden shadow-sm">
            <thead>
                <tr className="bg-[#3B82F6] text-white h-[46px]">
                    <th className="py-2 px-4 text-left font-normal text-[18px] pl-5 rounded-tl-lg">Nama</th>
                    <th className="py-2 px-4 text-left font-normal  text-[18px] ">Kelas</th>
                    <th className="py-2 px-4 text-center font-normal text-[18px] ">Kehadiran</th>
                    <th className="py-2 px-4 text-center font-normal  text-[18px] ">Sakit</th>
                    <th className="py-2 px-4 text-center font-normal  text-[18px] ">Izin</th>
                    <th className="py-2 px-4 text-center font-normal  text-[18px] rounded-tr-lg ">Alpha</th>
                </tr>
            </thead>

            <tbody>
            {students.map((s,i) => (
                <tr key={i} className="h-[59px]">
                    <td className="py-2 px-4 border-l pl-8 border-b border-[#000000]/20 text-left text-[16px] font-medium">
                        {s.student_name}
                    </td>
                    <td className="py-2 px-4 border-b border-[#000000]/20 text-left text-[16px] font-medium">
                        {s.classroom_name}
                    </td>
                    <td className="py-2 px-4 border-b border-[#000000]/20 text-center  font-medium ">
                        <span className="w-[58px] p-1 rounded-md h-[31px] text-[#10B981] bg-[#10B981]/20 inline-flex justify-center text-[16px] font-medium" > {s.kehadiran} </span>
                    </td>
                    <td className="py-2 px-4 border-b border-[#000000]/20 text-center  font-medium">
                        <span className="w-[34px] p-1 rounded-md h-[31px] text-[#FACC15] bg-[#FACC15]/20 inline-flex justify-center text-[16px] font-medium " > {s.sakit} </span>
                    </td>
                    <td className="py-2 px-4 border-b border-[#000000]/20 text-center text-[16px] font-medium">
                        <span className="w-[32px] p-1 rounded-md h-[31px] text-[#3B82F6] bg-[#3B82F6]/20 inline-flex justify-center text-[16px] font-medium " > {s.izin} </span>
                    </td>
                    <td className="py-2 px-4 border-b border-[#000000]/20 text-center text-[16px] font-medium">
                        <span className="w-[34px] p-1 rounded-md h-[31px] text-[#FF5E53] bg-[#FF5E53]/20 inline-flex justify-center text-[16px] font-medium " > {s.alpha} </span>
                    </td>
                    
                </tr>
            ))}
            </tbody>

        </table>
    );
}