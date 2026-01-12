import { Check, X, Eye } from 'lucide-react';
import Pagination from './Pagination';

export default function Table({  data, loading,  error,  currentPage,  lastPage,  totalItems,  perPage,  onPageChange, onAction}) {

    const StatusBadge = ({ status }) => {
        const color =
            status === "sakit" ? "bg-[#F59E0B]" :
            status === "dispensasi" ? "bg-[#22C55E]" :
            "bg-[#0EA5E9] ";

        return (
            <span className={`px-3 py-1 text-[12px] text-white w-[105px] font-medium rounded-full inline-block ${color}`}>
                {status}
            </span>
        );
    };

    // const ActionButton = ({ icon: Icon, color, onClick }) => {
    //     const isEyeIcon = Icon === Eye;
    //     const iconBackgroundClass = isEyeIcon ? "" : "bg-white rounded-full";
        
    //     let iconColorClass;
    //     if (isEyeIcon) {
    //         iconColorClass = "text-white";
    //     } else if (Icon === Check) {
    //         iconColorClass = "text-green-600";
    //     } else if (Icon === X) {
    //         iconColorClass = "text-red-500";
    //     } else {
    //         iconColorClass = "text-blue-600";
    //     }

    //     return (
    //         <button onClick={onClick} className={`w-8 h-8 p-2 rounded-lg text-white shadow-md transition-all duration-200 flex items-center justify-center ${color} hover:shadow-lg hover:brightness-105`}>
    //             <div className={`flex items-center justify-center p-[1px] ${iconBackgroundClass}`}>
    //                 <Icon size={isEyeIcon ? 20 : 16} strokeWidth={isEyeIcon ? 2.5 : 4} className={iconColorClass}/>
    //             </div>
    //         </button>
    //     );
    // };


    return (
        <>
            <div className="overflow-x-auto rounded-lg drop-shadow-md border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-[#3B82F6] text-white">
                        <tr>
                            {["No","Nama","Kelas","Tipe Izin","Tanggal","Aksi"].map((header) => (
                                <th key={header} className={`px-4 py-3 text-sm font-medium  ${header === 'Aksi' ? 'w-[150px] sm:w-auto' : ''}`}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={6} className="py-4 text-blue-600">Memuat data...</td></tr>
                        ) : error ? (
                            <tr><td colSpan={6} className="py-4 text-red-600">{error}</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={6} className="py-4 text-gray-600">Tidak ada data izin yang menunggu verifikasi.</td></tr>
                        ) : (
                            data.map((s, index) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition duration-100">
                                    <td className="px-4 py-3 whitespace-nowrap text-md font-medium text-gray-900 w-12">{(currentPage - 1) * perPage + index + 1}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.student?.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-[12px] text-white font-medium">
                                        <span className={`inline-block rounded-full text-center w-[105px] py-1 px-2 ${s.classroom?.name ? 'bg-[#8B5CF6]' : ''}`}>
                                            {s.classroom?.name || "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={s.type.label} /></td>
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.start_date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium w-[150px] sm:w-auto text-center">
                                        <button onClick={() => onAction("view", s)} className="bg-[#3B82F6] text-[12px] rounded-md h-[30px] py-[7px] px-3 text-white font-medium hover:bg-[#2563EB] transition-200 cursor-pointer">Lihat Detail</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4">
                {totalItems > 0 && (
                    <Pagination currentPage={currentPage} lastPage={lastPage} totalItems={totalItems} perPage={perPage} onPageChange={onPageChange} isLoading={loading}/>
                )}
            </div>
        </>
    );
}