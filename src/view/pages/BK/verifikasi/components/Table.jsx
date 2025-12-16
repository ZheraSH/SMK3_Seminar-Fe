import { Check, X, Eye } from 'lucide-react';
import Pagination from './Pagination';

export default function Table({  data, loading,  error,  currentPage,  lastPage,  totalItems,  perPage,  onPageChange, onAction}) {

    const StatusBadge = ({ status }) => {
        const color =
            status === "sakit" ? "bg-yellow-100 text-yellow-700" :
            status === "dispensasi" ? "bg-[#10B98133] text-[#30D158]" :
            "bg-[#3B82F633] text-[#3B82F6] ";

        return (
            <span className={`px-3 py-1 text-xs w-[105px] font-medium rounded-md inline-block ${color}`}>
                {status}
            </span>
        );
    };

    const ActionButton = ({ icon: Icon, color, onClick }) => {
        const isEyeIcon = Icon === Eye;
        const iconBackgroundClass = isEyeIcon ? "" : "bg-white rounded-full";
        
        let iconColorClass;
        if (isEyeIcon) {
            iconColorClass = "text-white";
        } else if (Icon === Check) {
            iconColorClass = "text-green-600";
        } else if (Icon === X) {
            iconColorClass = "text-red-500";
        } else {
            iconColorClass = "text-blue-600";
        }

        return (
            <button onClick={onClick} className={`w-8 h-8 p-2 rounded-lg text-white shadow-md transition-all duration-200 flex items-center justify-center ${color} hover:shadow-lg hover:brightness-105`}>
                <div className={`flex items-center justify-center p-[1px] ${iconBackgroundClass}`}>
                    <Icon size={isEyeIcon ? 20 : 16} strokeWidth={isEyeIcon ? 2.5 : 4} className={iconColorClass}/>
                </div>
            </button>
        );
    };


    return (
        <>
            <div className="overflow-x-auto rounded-lg drop-shadow-md border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-[#3B82F6] text-white">
                        <tr>
                            {["No","Nama","Kelas","Tanggal","Keterangan","Aksi"].map((header) => (
                                <th
                                    key={header}
                                    className={`px-4 py-3 text-sm font-medium  ${header === 'Aksi' ? 'w-[150px] sm:w-auto' : ''}`}
                                >
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
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.classroom?.name || "-"}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.start_date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={s.type_label} /></td>

                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium w-[150px] sm:w-auto text-center">
                                        <div className="flex items-center justify-center space-x-2 text-center">
                                           {s.status === 'pending' && (
                                                <>
                                                    <ActionButton
                                                        icon={Check}
                                                        color="bg-[#30D158]"
                                                        onClick={() => onAction("approve", s)} 
                                                    />
                                                    <ActionButton
                                                        icon={X}
                                                        color="bg-[#FF5E53]"
                                                        onClick={() => onAction("reject", s)} 
                                                    />
                                                </>
                                            )}
                                            <ActionButton
                                                icon={Eye}
                                                color="bg-blue-500 hover:bg-blue-600"
                                                onClick={() => onAction("view", s)}
                                            />
                                        </div>
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